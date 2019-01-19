import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarItem, DropdownItem, Dropdown, DropdownPosition, KebabToggle, Title, Button } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import spacingStyles from '@patternfly/patternfly-next/utilities/Spacing/spacing.css';
import flexStyles from '@patternfly/patternfly-next/utilities/Flex/flex.css';
import '../../SmartComponents/Portfolio/portfolio.scss';

class PlatformActionToolbar extends Component {

    state = {
      isKebabOpen: false
    };

    onKebabToggle = isOpen => {
      this.setState({
        isKebabOpen: isOpen
      });
    };

    buildPlatformActionKebab = () => {
      const { isKebabOpen } = this.state;

      return (
        <Dropdown
          onToggle={ this.onKebabToggle }
          onSelect={ this.onKebabSelect }
          position={ DropdownPosition.right }
          toggle={ <KebabToggle onToggle={ this.onKebabToggle }/> }
          isOpen={ isKebabOpen }
          dropdownItems={ [
            <DropdownItem component="button" aria-label="Edit Platform" key="edit-platform">
              <Link to={ this.props.editPlatformRoute }>
                Edit Platform
              </Link>
            </DropdownItem>
          ] }
          isPlain
        />
      );
    };

    render() {
      return (
        <Toolbar className={ css(flexStyles.justifyContentSpaceBetween, spacingStyles.mxXl, spacingStyles.myMd) }>
          <ToolbarGroup>
            <ToolbarItem className={ css(spacingStyles.mrXl) }>
              { this.props.title && (<Title size={ '2xl' }> { this.props.title }</Title>) }
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarGroup className={ 'pf-u-ml-auto-on-xl' }>
            <ToolbarItem className={ css(spacingStyles.mxLg) }>
              <Link to={ this.props.addToPortfolioRoute }>
                <Button variant="link" aria-label="Add Products to Portfolio">
                  Add to Portfolio
                </Button>
              </Link>
            </ToolbarItem>
            <ToolbarItem>
              { this.buildPlatformActionKebab() }
            </ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      );
    }
}

PlatformActionToolbar.propTypes = {
  title: propTypes.string,
  onClickEditPlatform: propTypes.func,
  addToPortfolioRoute: propTypes.string.isRequired,
  editPlatformRoute: propTypes.string.isRequired
};

export default PlatformActionToolbar;
