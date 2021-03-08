import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Field from '@data-driven-forms/react-form-renderer/dist/cjs/field';
import loadProductOptions from './load-items-debounced';
import formMessages from '../messages/forms.messages';
import { BEFORE_TYPE, AFTER_TYPE } from '../utilities/constants';
import { IntlShape } from 'react-intl';
import asyncDebounce from '../utilities/async-form-validator';
import { loadPortfolioOptions } from '../helpers/order-process/order-process-helper';

const setItemsSelectSchema = (
  type: 'before' | 'after' | 'return',
  intl: IntlShape,
  condition: { when: string; is: string }
): Field[] => [
  {
    component: componentTypes.SELECT,
    name: `${type}_portfolio_id`,
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
    loadOptions: asyncDebounce(loadPortfolioOptions),
    noValueUpdates: true,
    isSearchable: true,
    isClearable: true,
    condition
  },
  {
    component: componentTypes.SELECT,
    name: `${type}_portfolio_item_id`,
    loadOptions: loadProductOptions,
    noValueUpdates: true,
    isSearchable: true,
    isClearable: true,
    condition
  }
];

export default setItemsSelectSchema;
