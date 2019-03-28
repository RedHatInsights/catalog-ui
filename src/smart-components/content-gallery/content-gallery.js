import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '@red-hat-insights/insights-frontend-components';
import { CardLoader } from '../../presentational-components/shared/loader-placeholders';
import { Text, TextVariants, Gallery } from '@patternfly/react-core';

const NoItemsDefault = () => <Text component={ TextVariants.h1 }>No items found</Text>;

const ContentGallery = ({ isLoading, items, NoItems }) => isLoading ? <CardLoader /> : (
  <Section type="content">
    { items.length > 0 ?
      <Gallery gutter="md" className="content-gallery">
        { items }
      </Gallery>
      : NoItems ? <NoItems /> : <NoItemsDefault />
    }
  </Section>
);

ContentGallery.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  NoItems: PropTypes.node
};
export default ContentGallery;
