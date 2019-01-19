import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarItem, Title, Button } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
import flexStyles from '@patternfly/patternfly-next/utilities/Flex/flex.css';
import '../../SmartComponents/Portfolio/portfolio.scss';

const AddToPortfolioTitleToolbar = ({ title, addSelectPortfolioRoute, platformRoute }) =>(
  <Toolbar
    className={ css(flexStyles.justifyContentSpaceBetween, spacingStyles.mxXl, spacingStyles.myMd) }
    style={ { backgroundColor: '#FFFFFF' } }
  >
    <ToolbarGroup>
      <ToolbarItem className={ css(spacingStyles.mrXl) }>
        { title &&  (<Title size={ '2xl' }> { 'Add To Portfolio: ' + title }</Title>) }
      </ToolbarItem>
    </ToolbarGroup>
    <ToolbarGroup className={ 'pf-u-ml-auto-on-xl' }>
      <ToolbarItem className={ css(spacingStyles.mxLg) }>
        <Link to={ platformRoute }>
          <Button variant="link" aria-label="Cancel Add Products to Portfolio">
            Cancel
          </Button>
        </Link>
      </ToolbarItem>
      <ToolbarItem className={ css(spacingStyles.mxLg) } >
        <Link to={ addSelectPortfolioRoute }>
          <Button variant="plain" aria-label="Add to Portfolio">
            Add
          </Button>
        </Link>
      </ToolbarItem>
    </ToolbarGroup>
  </Toolbar>
);

AddToPortfolioTitleToolbar.propTypes = {
  history: propTypes.object,
  title: propTypes.string,
  addSelectPortfolioRoute: propTypes.string,
  platformRoute: propTypes.string.isRequired
};

export default AddToPortfolioTitleToolbar;

