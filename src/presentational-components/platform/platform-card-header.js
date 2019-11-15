import React from 'react';
import PropTypes from 'prop-types';
import ImageWithDefault from '../shared/image-with-default';
import { Level, LevelItem } from '@patternfly/react-core';

import './platform-card.scss';

const PlatformCardHeader = ({ image, headerActions }) => (
  <Level>
    <ImageWithDefault src={ image } width="80" height="40"/>
    <LevelItem onClick={ event => event.preventDefault() }>
      { headerActions }
    </LevelItem>
  </Level>
);

PlatformCardHeader.propTypes = {
  image: PropTypes.string.isRequired,
  headerActions: PropTypes.arrayOf(PropTypes.node)
};

PlatformCardHeader.defaultProps = {
  headerActions: []
};

export default PlatformCardHeader;
