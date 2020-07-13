import React, { useState, useEffect, useReducer, Fragment } from 'react';
import PropTypes from 'prop-types';

import AddProductsGallery from './add-products-gallery';
import ToolbarRenderer from '../../../toolbar/toolbar-renderer';
import { defaultSettings } from '../../../helpers/shared/pagination';
import PlatformItem from '../../../presentational-components/platform/platform-item';
import createAddProductsSchema from '../../../toolbar/schemas/add-products-toolbar.schema';
import {
  fetchPlatformItems,
  fetchPlatforms
} from '../../../redux/actions/platform-actions';
import {
  addToPortfolio,
  fetchPortfolioItemsWithPortfolio
} from '../../../redux/actions/portfolio-actions';
import AsyncPagination from '../../common/async-pagination';
import useEnhancedHistory from '../../../utilities/use-enhanced-history';
import { useDispatch, useSelector } from 'react-redux';
import BottomPaginationContainer from '../../../presentational-components/shared/bottom-pagination-container';
import asyncFormValidator from '../../../utilities/async-form-validator';

const renderGalleryItems = (items = [], checkItem, checkedItems) =>
  items.map((item) => (
    <PlatformItem
      key={item.id}
      {...item}
      editMode
      onToggleItemSelect={() => checkItem(item.id)}
      checked={checkedItems.includes(item.id)}
    />
  ));

const initialState = {
  filterValue: '',
  searchFilterValue: '',
  isFetching: false,
  isFiltering: false
};

const addProductsState = (state, action) => {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    case 'setFilterValue':
      return { ...state, filterValue: action.payload };
    case 'setFilteringFlag':
      return { ...state, isFiltering: action.payload };
    case 'setFilterSearchValue':
      return { ...state, searchFilterValue: action.payload };
    case 'setFilterSearchFlag':
      return { ...state, isSearchFiltering: action.payload };
  }

  return state;
};

const debouncedFilter = asyncFormValidator(
  (id, filter, dispatch, filteringCallback, meta = defaultSettings) => {
    filteringCallback(true);
    dispatch(fetchPlatformItems(id, filter, { ...meta, filter })).then(() =>
      filteringCallback(false)
    );
  },
  1000
);

const AddProductsToPortfolio = ({ portfolioRoute }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(undefined);
  const [checkedItems, setCheckedItems] = useState([]);
  const [
    { filterValue, isFetching, searchFilterValue },
    stateDispatch
  ] = useReducer(addProductsState, initialState);
  const { push } = useEnhancedHistory();
  const dispatch = useDispatch();
  const { portfolio, platforms, platformItems, isLoading } = useSelector(
    ({
      portfolioReducer: { selectedPortfolio },
      platformReducer: { platforms, platformItems, isPlatformDataLoading }
    }) => ({
      platforms,
      platformItems,
      isLoading: isPlatformDataLoading,
      portfolio: selectedPortfolio
    })
  );

  useEffect(() => {
    dispatch(fetchPlatforms());
  }, []);

  const checkItem = (itemId) => {
    const index = checkedItems.indexOf(itemId);
    return index > -1
      ? [...checkedItems.slice(0, index), ...checkedItems.slice(index + 1)]
      : [...checkedItems, itemId];
  };

  const items =
    selectedPlatform && platformItems[selectedPlatform.id]
      ? platformItems[selectedPlatform.id].data
      : [];
  const meta =
    selectedPlatform &&
    platformItems[selectedPlatform.id] &&
    platformItems[selectedPlatform.id].meta;

  const handleFilterItems = (value) => {
    stateDispatch({ type: 'setFilterValue', payload: value });
    debouncedFilter(
      selectedPlatform.id,
      value,
      dispatch,
      (isFiltering) =>
        stateDispatch({ type: 'setFilteringFlag', payload: isFiltering }),
      {
        ...meta,
        offset: 0
      }
    );
  };

  const handleSearchFilterItems = (value) => {
    stateDispatch({ type: 'setSearchFilterValue', payload: value });
    debouncedFilter(
      value,
      dispatch,
      (isSearchFiltering) =>
        stateDispatch({
          type: 'setSearchFilteringFlag',
          payload: isSearchFiltering
        }),
      {
        ...meta,
        offset: 0
      }
    );
  };

  const handleAddToPortfolio = () => {
    dispatch({ type: 'setFetching', payload: true });
    return dispatch(addToPortfolio(portfolio.id, checkedItems))
      .then(() => dispatch({ type: 'setFetching', payload: false }))
      .then(() =>
        push({ pathname: portfolioRoute, search: `?portfolio=${portfolio.id}` })
      )
      .then(() => dispatch(fetchPortfolioItemsWithPortfolio(portfolio.id)))
      .catch(() => dispatch({ type: 'setFetching', payload: false }));
  };

  const onPlatformSelect = (platform) => {
    setSelectedPlatform(platform);
    dispatch(fetchPlatformItems(platform.id, filterValue, defaultSettings));
  };

  const fetchPlatformOptions = (inputValue) => {
    const platformOptions = platforms
      .filter((platform) => platform.name.contains(inputValue))
      .map((platform) => ({
        value: platform.id,
        label: platform.name,
        id: platform.id
      }));
    console.log('Debug - platform Options', platformOptions);
    return platformOptions;
  };

  return (
    <Fragment>
      <ToolbarRenderer
        schema={createAddProductsSchema({
          options: platforms.map((platform) => ({
            value: platform.id,
            label: platform.name,
            id: platform.id
          })),
          loadPlatformOptions: fetchPlatformOptions,
          isFetching,
          portfolioName: (portfolio && portfolio.name) || '',
          itemsSelected: checkedItems.length > 0,
          onOptionSelect: onPlatformSelect,
          onFilterChange: (value) => handleFilterItems(value),
          onSearchFilterChange: (value) => handleSearchFilterItems(value),
          portfolioRoute,
          onClickAddToPortfolio: handleAddToPortfolio,
          meta,
          platformId: selectedPlatform && selectedPlatform.id,
          searchValue: filterValue,
          filterSearchValue: searchFilterValue,
          fetchPlatformItems: (id, options) =>
            dispatch(fetchPlatformItems(id, filterValue, options))
        })}
      />
      <AddProductsGallery
        platform={!!selectedPlatform}
        checkedItems={checkedItems}
        isLoading={isLoading}
        items={renderGalleryItems(
          items,
          (itemId) => setCheckedItems(checkItem(itemId)),
          checkedItems
        )}
      />
      {meta && meta.count > 0 && (
        <BottomPaginationContainer>
          <AsyncPagination
            meta={meta}
            apiProps={selectedPlatform && selectedPlatform.id}
            apiRequest={(id, options) =>
              fetchPlatformItems(id, filterValue, options)
            }
            dropDirection="up"
          />
        </BottomPaginationContainer>
      )}
    </Fragment>
  );
};

AddProductsToPortfolio.propTypes = {
  portfolioRoute: PropTypes.string.isRequired
};

export default AddProductsToPortfolio;
