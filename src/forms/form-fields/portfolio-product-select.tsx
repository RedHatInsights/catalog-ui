/* eslint-disable react/prop-types */
import React, { useReducer, ComponentType } from 'react';
import { Grid, GridItem, Level } from '@patternfly/react-core';
import { InternalSelect } from '@data-driven-forms/pf4-component-mapper/dist/cjs/select';

import asyncFormValidator from '../../utilities/async-form-validator';
import formsMessages from '../../messages/forms.messages';
import { StyledLevelItem } from '../../presentational-components/styled-components/level';
import useFormatMessage from '../../utilities/use-format-message';
import { SelectOptions } from '../../types/common-types';

const initialState = {
  resetProduct: 0,
  portfolio: undefined,
  product: undefined
};

interface InternalProductReducerState {
  portfolio?: { id: string; value?: string; label: string };
  product?: { id: string; value?: string; label: string };
  permission?: string;
  resetProduct: number;
}

type ProductReducer = (
  state: InternalProductReducerState,
  action: {
    type: 'setPortfolio' | 'setProduct' | 'resetField';
    payload?: { id: string; value?: string; label: string } | string;
  }
) => InternalProductReducerState;

// TODO create keys for specific objects instead of using common payload. That way we wont need typecasting
const productReducer: ProductReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setProduct':
      return {
        ...state,
        product: payload as { id: string; value?: string; label: string }
      };
    case 'setPortfolio':
      return {
        ...state,
        portfolio: payload as { id: string; value?: string; label: string }
      };
    case 'resetField':
      return {
        product: undefined,
        portfolio: undefined,
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
}

export const PortfolioProductSelect: ComponentType<PortfolioProductSelectProps> = ({
  loadPortfolioOptions,
  loadProductOptions
}) => {
  const [{ portfolio, product, resetProduct }, dispatch] = useReducer(
    productReducer,
    initialState
  );
  const formatMessage = useFormatMessage();

  return (
    <Level>
      <StyledLevelItem grow>
        <Grid hasGutter className="share-column">
          <GridItem span={5}>
            <InternalSelect
              key={resetProduct}
              isSearchable
              isClearable
              simpleValue={false}
              menuIsPortal
              loadOptions={asyncFormValidator(loadPortfolioOptions)}
              placeholder={formatMessage(formsMessages.portfolioPlaceholder)}
              onChange={(value) =>
                dispatch({ type: 'setPortfolio', payload: value })
              }
              value={portfolio}
            />
          </GridItem>
          <GridItem span={7}>
            <InternalSelect
              name={'product'}
              isSearchable
              isClearable
              simpleValue={false}
              menuIsPortal
              loadOptions={asyncFormValidator(loadProductOptions)}
              placeholder={formatMessage(formsMessages.productPlaceholder)}
              onChange={(value) =>
                dispatch({ type: 'setProduct', payload: value })
              }
              value={product}
            />
          </GridItem>
        </Grid>
      </StyledLevelItem>
    </Level>
  );
};

export default PortfolioProductSelect;
