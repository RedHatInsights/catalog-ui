import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import { Section } from '@red-hat-insights/insights-frontend-components';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import '../Platform/platform.scss';
import '../../SmartComponents/Portfolio/portfolio.scss';
import PlatformOrderToolbar from '../../PresentationalComponents/Platform/PlatformOrderToolbar';
import AddToPortfolioTitleToolbar from '../../PresentationalComponents/Platform/AddToPortfolioTitleToolbar';
import { addToPortfolio, fetchPortfolios } from '../../redux/Actions/PortfolioActions';
import PlatformItem from '../../PresentationalComponents/Platform/PlatformItem';

class AddToPortfolio extends Component {
    state = {
      selectedPortfolios: [],
      checkedItems: [],
      searchValue: ''
    };

    handleFilterChange = searchValue => this.setState({ searchValue })

    onPortfolioSelectionChange = (selectedValues = []) =>
      this.setState(
        () => ({ selectedPortfolios: selectedValues }));

    onToggleItemSelect = checkedId => this.setState(({ checkedItems }) => {
      const index = checkedItems.indexOf(checkedId);
      if (index > -1) {
        return { checkedItems: [
          ...checkedItems.slice(0, index),
          ...checkedItems.slice(index + 1)
        ]};
      }

      return { checkedItems: [ ...checkedItems, checkedId ]};
    })

    onAddToPortfolio = () =>
      this.props.addToPortfolio(this.props.portfolio.id, this.state.checkedItems)
      .then(() => this.props.history.push(this.props.portfolioRoute))
      .then(() => this.props.fetchPortfolioItemsWithPortfolio(this.props.match.params.id));

    createItems = () => {
      const platformItems = this.props.platformItems[this.props.platform.id];
      return platformItems.filter(({ name }) => name.trim().toLowerCase().includes(this.state.searchValue.toLocaleLowerCase())).map(item =>
        <PlatformItem
          key={ item.id }
          { ...item }
          editMode
          onToggleItemSelect={ () => this.onToggleItemSelect(item.id) }
          checked={ this.state.checkedItems.includes(item.id) }
        />);
    }

    render() {
      let filteredItems = [];
      if (this.props.platformItems) {
        filteredItems = {
          items: this.createItems(),
          isLoading: this.props.isLoading
        };
      }

      let title = (this.props.platform) ? this.props.platform.name : '';
      return (
        <Section>
          <PlatformOrderToolbar/>
          <AddToPortfolioTitleToolbar title={ title }
            onClickAddToPortfolio = { this.onAddToPortfolio }
            addSelectPortfolioRoute={ this.props.addSelectPortfolioRoute }
            onPortfolioSelectionChange={ this.onPortfolioSelectionChange }
            platformRoute={ this.props.platformRoute }
          />
          <ContentGallery
            key={ this.props.platform.label }
            { ...filteredItems }
            title={ this.props.platform.name }
            editMode = { true }
            onToggleSelect = { this.onToggleItemSelect }
            checkedItems = { this.state.checkedItems }
          />
        </Section>
      );
    }
}

const mapStateToProps = ({ platformReducer: { platformItems, isPlatformDataLoading }}) => ({
  platformItems,
  isLoading: isPlatformDataLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addNotification,
  addToPortfolio,
  fetchPortfolios
}, dispatch);

AddToPortfolio.propTypes = {
  platformItems: propTypes.object,
  isLoading: propTypes.bool,
  isEditMode: propTypes.bool,
  addToPortfolio: propTypes.func,
  history: propTypes.shape({
    push: propTypes.func.isRequired
  }).isRequired,
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired
    }).isRequired
  }).isRequired,
  platformRoute: propTypes.string.isRequired,
  addSelectPortfolioRoute: propTypes.string.isRequired,
  fetchPortfolios: propTypes.func.isRequired
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddToPortfolio));
