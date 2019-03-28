import React from 'react';
import PropTypes from 'prop-types';
import ContentGallery from '../../content-gallery/content-gallery';
import NoItemsFound from './no-items-found';

const AddProductsGallery = props => <ContentGallery NoItems={ NoItemsFound } editMode = { true } { ...props } />;

AddProductsGallery.propTypes = {
  checkedItems: PropTypes.arrayOf(PropTypes.string)
};

AddProductsGallery.defaultProps = {
  checkedItems: []
};

export default AddProductsGallery;

