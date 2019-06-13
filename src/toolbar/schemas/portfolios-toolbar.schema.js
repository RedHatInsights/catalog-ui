import { toolbarComponentTypes } from '../toolbar-mapper';
import { createSingleItemGroup, createLinkButton } from '../helpers';

const createPortfolioToolbarSchema = ({
  filterProps: {
    searchValue,
    onFilterChange,
    placeholder
  }
}) => ({
  fields: [{
    component: toolbarComponentTypes.TOP_TOOLBAR,
    key: 'portfolios-top-toolbar',
    fields: [{
      component: toolbarComponentTypes.TOP_TOOLBAR_TITLE,
      key: 'portfolios-toolbar-title',
      title: 'Portfolios',
      id: 'portfolios-title'
    }, {
      component: toolbarComponentTypes.TOOLBAR,
      key: 'main-portfolio-toolbar',
      className: 'pf-u-mt-md',
      fields: [
        createSingleItemGroup({
          groupName: 'filter-group',
          component: toolbarComponentTypes.FILTER_TOOLBAR_ITEM,
          key: 'filter-input',
          searchValue,
          onFilterChange,
          placeholder,
          id: 'portfolios-filter-input'
        }),
        createSingleItemGroup({
          groupName: 'portfolio-button-group',
          key: 'create-portfolio',
          ...createLinkButton({
            to: '/portfolios/add-portfolio',
            variant: 'primary',
            key: 'create-portfolio-button',
            'aria-label': 'Create portfolio',
            title: 'Create portfolio',
            id: 'create-portfolio-button'
          })
        }) ]
    }]
  }]
});

export default createPortfolioToolbarSchema;
