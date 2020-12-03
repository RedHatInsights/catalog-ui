import Field from '@data-driven-forms/react-form-renderer/dist/cjs/field';
import formMessages from '../messages/forms.messages';
import { BEFORE_TYPE, AFTER_TYPE } from '../utilities/constants';
import { IntlShape } from 'react-intl';
import {
  loadPortfolioOptions,
  loadProductOptions
} from '../helpers/order-process/order-process-helper';

const setItemsSelectSchema = (
  type: 'before' | 'after' | 'return',
  intl: IntlShape,
  condition: { when: string; is: string }
): Field[] => [
  {
    component: 'portfolio-product-select',
    name: `${type}_portfolio_product-select`,
    label: ((item_type) => {
      let label;
      switch (item_type) {
        case BEFORE_TYPE:
          label = intl.formatMessage(formMessages.beforeProvision);
          break;
        case AFTER_TYPE:
          label = intl.formatMessage(formMessages.afterProvision);
          break;
        default:
          label = intl.formatMessage(formMessages.returnProvision);
      }

      return label;
    })(type),
    loadPortfolioOptions,
    loadProductOptions
  }
];

export default setItemsSelectSchema;
