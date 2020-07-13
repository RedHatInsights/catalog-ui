import { toolbarComponentTypes } from '../toolbar-mapper';
import { createLinkButton } from '../helpers';
import SearchFilterSelect from '../../presentational-components/shared/search-filter-select';
import ButtonWithSpinner from '../../presentational-components/shared/button-with-spinner';
import AsyncPagination from '../../smart-components/common/async-pagination';

const createAddProductsSchema = ({
  options,
  isFetching,
  searchValue,
  filterSearchValue,
  portfolioName,
  itemsSelected,
  onOptionSelect,
  onFilterChange,
  onSearchFilterChange,
  portfolioRoute,
  onClickAddToPortfolio,
  meta,
  platformId,
  fetchPlatformItems,
  loadPlatformOptions
}) => ({
  fields: [
    {
      component: toolbarComponentTypes.TOP_TOOLBAR,
      key: 'add-products-toolbar',
      fields: [
        {
          component: toolbarComponentTypes.TOP_TOOLBAR_TITLE,
          title: `Add products: ${portfolioName}`,
          key: 'add-products-title'
        },
        {
          component: toolbarComponentTypes.LEVEL,
          key: 'add-products-actions',
          fields: [
            {
              component: toolbarComponentTypes.TOOLBAR,
              key: 'add-products-actions-toolbar',
              fields: [
                {
                  component: toolbarComponentTypes.TOOLBAR_GROUP,
                  key: 'products-filter-group',
                  fields: [
                    {
                      component: SearchFilterSelect,
                      key: 'select-platforms',
                      id: 'products-platform-select',
                      isMulti: false,
                      loadOptions: loadPlatformOptions,
                      placeholder: 'Filter by Platform',
                      searchValue: filterSearchValue,
                      input: filterSearchValue,
                      options,
                      onChange: onOptionSelect
                    },
                    {
                      component: toolbarComponentTypes.FILTER_TOOLBAR_ITEM,
                      key: 'filter-products-input',
                      onFilterChange,
                      searchValue,
                      isDisabled: !platformId,
                      placeholder: 'Filter products'
                    }
                  ]
                },
                {
                  groupName: 'cancel-group-item',
                  ...createLinkButton({
                    key: 'add-products-cancel-button',
                    pathname: portfolioRoute,
                    variant: 'link',
                    'aria-label': 'Cancel Add products to Portfolio',
                    preserveSearch: true,
                    title: 'Cancel'
                  })
                },
                {
                  component: toolbarComponentTypes.TOOLBAR_ITEM,
                  key: 'add-group-item',
                  fields: [
                    {
                      key: 'portfolio-items-add-group',
                      component: ButtonWithSpinner,
                      variant: 'primary',
                      'aria-label': 'Add products to Portfolio',
                      title: 'Add',
                      type: 'button',
                      onClick: onClickAddToPortfolio,
                      isDisabled: !itemsSelected || isFetching,
                      showSpinner: isFetching,
                      children: 'Add',
                      id: 'add-products-to-portfolio'
                    }
                  ]
                }
              ]
            },
            {
              component: toolbarComponentTypes.LEVEL_ITEM,
              key: 'pagination-item',
              fields: meta
                ? [
                    {
                      component: AsyncPagination,
                      key: 'add-products-pagination',
                      meta,
                      apiProps: platformId,
                      apiRequest: fetchPlatformItems,
                      isCompact: true
                    }
                  ]
                : []
            }
          ]
        }
      ]
    }
  ]
});

export default createAddProductsSchema;
