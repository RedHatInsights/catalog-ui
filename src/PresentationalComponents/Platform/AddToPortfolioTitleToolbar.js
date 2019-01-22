import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarItem, Title, Button } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import '../../SmartComponents/Portfolio/portfolio.scss';

const AddToPortfolioTitleToolbar = ({ title, addSelectPortfolioRoute, onPortfolioSelectionChange, platformRoute }) =>(
  <Toolbar
    style={ { backgroundColor: '#FFFFFF' } }
  >
    <ToolbarGroup>
      <ToolbarItem>
        { title &&  (<Title size={ '2xl' }> { 'Add To Portfolio: ' + title }</Title>) }
      </ToolbarItem>
    </ToolbarGroup>
    <ToolbarGroup className={ 'pf-u-ml-auto-on-xl' }>
      <ToolbarItem>
        <Link to={ platformRoute }>
          <Button variant="link" aria-label="Cancel Add Products to Portfolio">
            Cancel
          </Button>
        </Link>
      </ToolbarItem>
      <ToolbarItem>
        <Link to={ addSelectPortfolioRoute }>
          <Button variant="link" aria-label="Add Products to Portfolio">
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
  onPortfolioSelectionChange: propTypes.func.isRequired,
  platformRoute: propTypes.string.isRequired
};

export default AddToPortfolioTitleToolbar;

