import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Field from '@data-driven-forms/react-form-renderer/dist/cjs/field';
import loadProductOptions from './load-items-debounced';
import formMessages from '../messages/forms.messages';
import { BEFORE_TYPE } from '../utilities/constants';
import { IntlShape } from 'react-intl';
import asyncDebounce from '../utilities/async-form-validator';
import { loadPortfolioOptions } from '../helpers/order-process/order-process-helper';

const setItemsSelectSchema = (
  type: 'before' | 'after',
  intl: IntlShape
): Field[] => [
  {
    component: componentTypes.SELECT,
    name: `${type}_portfolio_id`,
    label: intl.formatMessage(
      type === BEFORE_TYPE
        ? formMessages.beforeProvision
        : formMessages.afterProvision
    ),
    loadOptions: asyncDebounce(loadPortfolioOptions),
    noValueUpdates: true,
    isSearchable: true,
    isClearable: true
  },
  {
    component: componentTypes.SELECT,
    name: `${type}_portfolio_item_id`,
    loadOptions: loadProductOptions,
    noValueUpdates: true,
    isSearchable: true,
    isClearable: true
  }
];

export default setItemsSelectSchema;
