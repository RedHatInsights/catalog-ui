import Field from '@data-driven-forms/react-form-renderer/dist/cjs/field';
import formMessages from '../messages/forms.messages';
import { BEFORE_TYPE } from '../utilities/constants';
import { IntlShape } from 'react-intl';
import {
  loadPortfolioOptions,
  loadProductOptions
} from '../helpers/order-process/order-process-helper';

const setItemsSelectSchema = (
  type: 'before' | 'after',
  intl: IntlShape
): Field[] => [
  {
    component: 'portfolio-product-select',
    name: `${type}_portfolio_product-select`,
    label: intl.formatMessage(
      type === BEFORE_TYPE
        ? formMessages.beforeProvision
        : formMessages.afterProvision
    ),
    loadPortfolioOptions,
    loadProductOptions
  }
];

export default setItemsSelectSchema;
