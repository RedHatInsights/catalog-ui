import React, { Fragment, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { SearchIcon } from '@patternfly/react-icons';
import { Section } from '@redhat-cloud-services/frontend-components';
import { scrollToTop } from '../../helpers/shared/helpers';
import ToolbarRenderer from '../../toolbar/toolbar-renderer';
import { defaultSettings, getCurrentPage, getNewPage } from '../../helpers/shared/pagination';
import { createApprovalFilterToolbarSchema } from '../../toolbar/schemas/platforms-toolbar.schema';
import ContentGaleryEmptyState from '../../presentational-components/shared/content-gallery-empty-state';
import asyncFormValidator from '../../utilities/async-form-validator';
import debouncePromise from 'awesome-debounce-promise/dist/index';
import ContentList from '../../presentational-components/shared/content-list';
import { listWorkflowsForObjects } from '../../redux/actions/approval-actions';
import { createRows } from './approval-table-helpers.js';

const initialState = {
  filterValue: '',
  isOpen: false,
  isFetching: true,
  isFiltering: false
};

const ApprovalWorkflowsState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    case 'setFilterValue':
      return { ...state, filterValue: action.payload };
    case 'setFilteringFlag':
      return { ...state, isFiltering: action.payload };
    default:
      return state;
  }
};

const columns = [ 'Name', 'Description' ];

const ApprovalWorkflows = (props) => {
  const [{ filterValue, isFetching, isFiltering }, stateDispatch ] = useReducer(ApprovalWorkflowsState, initialState);
  const { data, meta } = useSelector(({ platformReducer: { ApprovalWorkflows }}) => ApprovalWorkflows);
  const platform = useSelector(({ platformReducer: { selectedPlatform }}) => selectedPlatform);
  const dispatch = useDispatch();

  const debouncedFilter = asyncFormValidator((value, dispatch, filteringCallback, meta = defaultSettings) => {
    filteringCallback(true);
    dispatch(listWorkflowsForObjects(props.resourceObject.objectType,
      props.resourceObject.appName,
      props.resourceObject.objectId, meta)).then(() => filteringCallback(false));
  }, 1000);

  useEffect(() => {
    dispatch(listWorkflowsForObjects(props.resourceObject.objectType,
      props.resourceObject.appName,
      props.resourceObject.objectId, filterValue, defaultSettings))
    .then(() => stateDispatch({ type: 'setFetching', payload: false }));
    scrollToTop();
  }, []);

  const handleFilterChange = value => {
    stateDispatch({ type: 'setFilterValue', payload: value });
    debouncedFilter(value, dispatch, isFiltering => stateDispatch({ type: 'setFilteringFlag', payload: isFiltering }), {
      ...meta,
      offset: 0
    });
  };

  const handleOnPerPageSelect = limit => listWorkflowsForObjects(props.resourceObject.objectType,
    props.resourceObject.appName, props.resourceObject.objectId, {
      offset: meta.offset,
      limit
    });

  const handleSetPage = (number, debounce) => {
    const options = {
      offset: getNewPage(number, meta.limit),
      limit: props.paginationCurrent.limit
    };

    const request = () => dispatch(listWorkflowsForObjects(props.resourceObject.objectType,
      props.resourceObject.appName, props.resourceObject.objectId, filterValue, options));
    if (debounce) {
      return debouncePromise(request, 250)();
    }

    return request();
  };

  const actionResolver = (value) => {
    props.removeWorkflow(value);
  };

  const renderItems = () => {
    const approvalRows = data ? createRows(data, filterValue) : [];
    const paginationCurrent = meta || defaultSettings;
    const title =  platform ? platform.name : '';
    return (
      <Fragment>
        <ToolbarRenderer schema={ createApprovalFilterToolbarSchema({
          onFilterChange: handleFilterChange,
          searchValue: filterValue,
          pagination: {
            itemsPerPage: paginationCurrent.limit,
            numberOfItems: paginationCurrent.count,
            onPerPageSelect: handleOnPerPageSelect,
            page: getCurrentPage(paginationCurrent.limit, paginationCurrent.offset),
            onSetPage: handleSetPage,
            direction: 'down'
          }
        }) }/>
        <Section type="content">
          <ContentList title={ title }
            data={ approvalRows }
            columns={ columns }
            isLoading={ isFetching || isFiltering }
            actionResolver = { actionResolver }
            renderEmptyState={ () => (
              <ContentGaleryEmptyState
                title="No workflows"
                Icon={ SearchIcon }
                description={ filterValue === '' ? 'No workflows found.' : 'No workflows match your filter criteria.' }
              />
            ) } />
        </Section>
      </Fragment>
    );};

  return renderItems();
};

ApprovalWorkflows.propTypes = {
  isPlatformDataLoading: PropTypes.bool,
  platform: PropTypes.shape({
    name: PropTypes.string
  }),
  title: PropTypes.string,
  ApprovalWorkflows: PropTypes.arrayOf(PropTypes.shape({})),
  paginationCurrent: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    count: PropTypes.number
  })
};

ApprovalWorkflows.defaultProps = {
  platformItems: [],
  paginationCurrent: {
    limit: 50,
    offset: 0
  }
};

export default ApprovalWorkflows;
