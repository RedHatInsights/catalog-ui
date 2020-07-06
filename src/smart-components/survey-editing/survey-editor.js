import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import FormBuilder from '@data-driven-forms/form-builder/dist/cjs';
import {
  builderMapper,
  fieldProperties,
  pickerMapper,
  propertiesMapper,
  BuilderTemplate
} from '@data-driven-forms/form-builder/dist/cjs/pf4-builder-mappers';
import { Spinner } from '@patternfly/react-core/dist/js/components/Spinner/Spinner';

import {
  getAxiosInstance,
  getServicePlansApi
} from '../../helpers/shared/user-login';
import { CATALOG_API_BASE } from '../../utilities/constants';
import { Bullseye } from '@patternfly/react-core';
import { SurveyEditingToolbar } from '../portfolio/portfolio-item-detail/portfolio-item-detail-toolbar';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/cjs/actions';
import {
  catalogValidatorAlias,
  catalogComponentMapper
} from '../common/form-renderer';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';

const componentProperties = {
  [componentTypes.TEXT_FIELD]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.HELPER_TEXT,
      fieldProperties.PLACEHOLDER,
      fieldProperties.IS_DISABLED,
      fieldProperties.IS_READ_ONLY,
      fieldProperties.HIDE_FIELD
    ]
  },
  [componentTypes.CHECKBOX]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.IS_DISABLED,
      fieldProperties.OPTIONS,
      fieldProperties.HIDE_FIELD
    ]
  },
  [componentTypes.SELECT]: {
    attributes: [
      fieldProperties.OPTIONS,
      fieldProperties.LABEL,
      fieldProperties.IS_DISABLED,
      fieldProperties.PLACEHOLDER,
      fieldProperties.HELPER_TEXT,
      fieldProperties.HIDE_FIELD
    ]
  },
  [componentTypes.DATE_PICKER]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.TODAY_BUTTON_LABEL,
      fieldProperties.IS_CLEARABLE,
      fieldProperties.CLOSE_ON_DAY_SELECT,
      fieldProperties.SHOW_TODAY_BUTTON,
      fieldProperties.HIDE_FIELD
    ]
  },
  [componentTypes.PLAIN_TEXT]: {
    attributes: [fieldProperties.MULTI_LINE_LABEL]
  },
  [componentTypes.RADIO]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.IS_DISABLED,
      fieldProperties.OPTIONS,
      fieldProperties.HIDE_FIELD
    ]
  },
  [componentTypes.SWITCH]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.IS_READ_ONLY,
      fieldProperties.IS_DISABLED,
      fieldProperties.HIDE_FIELD
    ]
  },
  [componentTypes.TEXTAREA]: {
    attributes: [
      fieldProperties.LABEL,
      fieldProperties.HELPER_TEXT,
      fieldProperties.IS_READ_ONLY,
      fieldProperties.IS_DISABLED,
      fieldProperties.HIDE_FIELD
    ]
  }
};

componentProperties['select-field'] =
  componentProperties[componentTypes.SELECT];
componentProperties['textarea-field'] =
  componentProperties[componentTypes.TEXTAREA];
const pf4Skin = {
  componentMapper: {
    ...catalogComponentMapper
  },
  builderMapper: {
    ...builderMapper
  },
  pickerMapper: {
    ...pickerMapper,
    'select-field': pickerMapper[componentTypes.SELECT],
    'textarea-field': pickerMapper[componentTypes.TEXTAREA]
  },
  propertiesMapper,
  componentProperties
};

// remove after API full migration to v2
const changeValidators = (schema) => {
  const result = { ...schema };
  result.fields = result.fields.map(({ validate, ...rest }) => {
    return validate
      ? {
          ...rest,
          validate: validate.map(({ type, ...rest }) => ({
            ...rest,
            type: catalogValidatorAlias[type] || type
          }))
        }
      : rest;
  });
  return result;
};

// remove after API full migration to v2
const appendValidator = (schema) => {
  const result = { ...schema };
  result.fields = result.fields.map(({ validate, ...rest }) => {
    return validate
      ? {
          ...rest,
          validate: validate.map(({ type, ...rest }) => ({
            ...rest,
            type:
              type !== validatorTypes.MAX_NUMBER_VALUE &&
              type !== validatorTypes.MIN_NUMBER_VALUE
                ? `${type}-validator`
                : type
          }))
        }
      : rest;
  });
  return result;
};

const BuilderWrapper = (props) => <FormBuilder {...props} />;

const SurveyEditor = ({ closeUrl, search, portfolioItem, uploadIcon }) => {
  const [schema, setSchema] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [baseSchema, setBaseSchema] = useState();
  const [servicePlan, setServicePlan] = useState();
  /**
   * There is an issues with later versions react final form, that it ignores parent props changes and caches
   * itself to increase performance. This had an unfortunate side effect of ignoring the outside schema changes
   * which are not propagated to the component tree. We use this counter to destroy the old and create a new instance
   * when the key (updateHack) counter is changed. There is currently no better sollution due to the fact that the
   * react final form is an outside dependency.
   * We will make an effort to fix it inside the library but until then we need this workaround.
   */
  const [updateHack, setUpdateHack] = useState(0);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const getServicePlan = () =>
    getAxiosInstance()
      .get(
        `${CATALOG_API_BASE}/portfolio_items/${portfolioItem.id}/service_plans`
      )
      .then((servicePlan) => {
        const [
          {
            create_json_schema: { schema }
          }
        ] = servicePlan;
        setServicePlan(servicePlan[0]);
        if (servicePlan[0].imported) {
          return getAxiosInstance()
            .get(`${CATALOG_API_BASE}/service_plans/${servicePlan[0].id}/base`)
            .then((baseSchema) => {
              setBaseSchema(
                changeValidators(baseSchema.create_json_schema.schema)
              );
              return changeValidators(schema);
            });
        }

        return changeValidators(schema);
      })
      .then((schema) => {
        setSchema(schema);
        setIsFetching(false);
      });
  useEffect(() => {
    getServicePlan();
  }, []);

  const modifySurvey = (editedTemplate) =>
    getServicePlansApi().patchServicePlanModified(`${servicePlan.id}`, {
      modified: { schema: editedTemplate }
    });
  const createSurvey = (editedTemplate) =>
    getServicePlansApi()
      .createServicePlan({ portfolio_item_id: portfolioItem.id })
      .then(([{ id }]) => id)
      .then((id) =>
        getServicePlansApi().patchServicePlanModified(`${id}`, {
          modified: { schema: editedTemplate }
        })
      );
  const handleSaveSurvey = (editedTemplate) => {
    setIsFetching(true);
    const submitCall = servicePlan.imported ? modifySurvey : createSurvey;
    return submitCall(appendValidator(editedTemplate))
      .then(() => {
        setIsFetching(false);
        dispatch(
          addNotification({
            variant: 'success',
            title: `Survey of ${portfolioItem.name} has been modified.`,
            dismissable: true
          })
        );
        return push({ pathname: closeUrl, search });
      })
      .catch((error) => {
        setIsFetching(false);
        dispatch({ type: 'EDIT_SURVEY_REJECTED', payload: error });
      });
  };

  const handleResetSurvey = (id) => {
    setSchema(undefined);
    getServicePlansApi()
      .resetServicePlanModified(id)
      .then(getServicePlan)
      .then(() => {
        /**
         * Counter has to updated again after the update was successfull
         * This mutation amkes sure that new instance will be created after the data was returned
         * form API.
         */
        setUpdateHack((prevCount) => prevCount + 1);
        return dispatch(
          addNotification({
            variant: 'success',
            title: `Survey of ${portfolioItem.name} has been restored.`,
            dismissable: true
          })
        );
      });
  };

  return (
    <Fragment>
      {schema ? (
        [
          <BuilderWrapper
            {...pf4Skin}
            // this key is required to destroy outdated instances of the form builder
            key={updateHack}
            schema={schema}
            disableDrag
            disableAdd
            schemaTemplate={baseSchema}
            mode="subset"
          >
            {({ getSchema, isValid, ...props }) => (
              <Fragment>
                <SurveyEditingToolbar
                  key="survey-editor-toolbar"
                  uploadIcon={uploadIcon}
                  product={portfolioItem}
                  handleSaveSurvey={() => handleSaveSurvey(getSchema())}
                  isValid={isValid}
                  closeUrl={closeUrl}
                  search={search}
                  isFetching={isFetching || !schema}
                  modified={servicePlan?.modified}
                  handleResetSurvey={() => handleResetSurvey(servicePlan.id)}
                />
                <BuilderTemplate {...props} />;
              </Fragment>
            )}
          </BuilderWrapper>
        ]
      ) : (
        <Fragment>
          <SurveyEditingToolbar
            uploadIcon={uploadIcon}
            product={portfolioItem}
            handleSaveSurvey={handleSaveSurvey}
            closeUrl={closeUrl}
            search={search}
            isFetching={!schema || isFetching}
          />
          <Bullseye>
            <Spinner />
          </Bullseye>
        </Fragment>
      )}
    </Fragment>
  );
};

SurveyEditor.propTypes = {
  closeUrl: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  uploadIcon: PropTypes.func.isRequired,
  portfolioItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  portfolio: PropTypes.object.isRequired
};

export default SurveyEditor;
