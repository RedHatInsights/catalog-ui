/* eslint-disable react/prop-types */
import React, { useReducer, ComponentType } from 'react';
import {
  Grid,
  GridItem,
  Level,
  Stack,
  StackItem,
  Title
} from '@patternfly/react-core';
import { InternalSelect } from '@data-driven-forms/pf4-component-mapper/dist/cjs/select';

import asyncFormValidator from '../../utilities/async-form-validator';
import formsMessages from '../../messages/forms.messages';
import { StyledLevelItem } from '../../presentational-components/styled-components/level';
import useFormatMessage from '../../utilities/use-format-message';
import { SelectOptions } from '../../types/common-types';
import useFormApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-form-api';

const initialState = {
  resetProduct: 0,
  portfolio: undefined,
  product: undefined
};

interface InternalProductReducerState {
  portfolio?: { id: string; value?: string; label: string };
  product?: { id: string; value?: string; label: string };
  resetProduct: number;
}

type ProductReducer = (
  state: InternalProductReducerState,
  action: {
    type: 'setPortfolio' | 'setProduct' | 'resetProduct';
    payload?: { id: string; value?: string; label: string } | string;
  }
) => InternalProductReducerState;

// TODO create keys for specific objects instead of using common payload. That way we wont need typecasting
const productReducer: ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setProduct':
      console.log('Debug - setProduct: state, payload', state, payload);
      return {
        ...state,
        product: payload as { id: string; value?: string; label: string }
      };
    case 'setPortfolio':
      return {
        ...state,
        portfolio: payload as { id: string; value?: string; label: string }
      };
    case 'resetProduct':
      return {
        product: undefined,
        resetProduct: state.resetProduct + 1
      };
  }

  return state;
};

export interface PortfolioProductSelectProps {
  loadPortfolioOptions: (...args: any[]) => Promise<SelectOptions>;
  loadProductOptions: (...args: any[]) => Promise<SelectOptions>;
  portfolio: SelectOptions;
  product: SelectOptions;
  title: string;
}
export const PortfolioProductSelect: ComponentType<PortfolioProductSelectProps> = ({
  loadPortfolioOptions,
  loadProductOptions,
  title
}) => {
  const [{ portfolio, product, resetProduct }, dispatch] = useReducer(
    productReducer,
    initialState
  );
  const formatMessage = useFormatMessage();
  const formOptions = useFormApi();

  return (
    <Stack>
      <StackItem>
        <Title headingLevel="h6">{title}</Title>
      </StackItem>
      <StackItem>
        <Level>
          <StyledLevelItem grow>
            <Grid hasGutter className="share-column">
              <GridItem span={5}>
                <Stack>
                  <StackItem>
                    <Title headingLevel="h6">Portfolio</Title>
                  </StackItem>
                  <StackItem>
                    <InternalSelect
                      key={resetProduct}
                      isSearchable
                      isClearable
                      simpleValue={false}
                      menuIsPortal
                      loadOptions={asyncFormValidator(loadPortfolioOptions)}
                      placeholder={formatMessage(
                        formsMessages.portfolioPlaceholder
                      )}
                      onChange={(value) => {
                        dispatch({ type: 'setPortfolio', payload: value });
                        formOptions.change('portfolio', value);
                        console.log(
                          'Debug - dispatch value, formOptions',
                          value,
                          formOptions.getState()
                        );
                      }}
                      value={portfolio}
                    />
                  </StackItem>
                </Stack>
              </GridItem>
              <GridItem span={7}>
                <Stack>
                  <StackItem>
                    <Title headingLevel="h6">Product</Title>
                  </StackItem>
                  <StackItem>
                    <InternalSelect
                      name={'product'}
                      key={'setPortfolio'}
                      isSearchable
                      isClearable
                      simpleValue={false}
                      menuIsPortal
                      loadOptions={asyncFormValidator((formOptions) => {
                        return loadProductOptions(
                          formOptions?.getState()?.values?.portfolio
                        );
                      })}
                      placeholder={formatMessage(
                        formsMessages.productPlaceholder
                      )}
                      onChange={(value) => {
                        dispatch({ type: 'setProduct', payload: value });
                        formOptions.change('product', value);
                      }}
                      value={product}
                    />
                  </StackItem>
                </Stack>
              </GridItem>
            </Grid>
          </StyledLevelItem>
        </Level>
      </StackItem>
    </Stack>
  );
};

export default PortfolioProductSelect;
