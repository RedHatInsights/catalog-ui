import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { fetchSelectedPlatform, fetchPlatformItems } from '../../redux/Actions/PlatformActions';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PlatformItem from '../../PresentationalComponents/Platform/PlatformItem';
import AddToPortfolio from '../../SmartComponents/Platform/AddToPortfolio';
import PlatformActionToolbar from '../../PresentationalComponents/Platform/PlatformActionToolbar';
import EditPlatformModal from './edit-platform-modal';
import { scrollToTop } from '../../Helpers/Shared/helpers';
import NoMatch from '../../PresentationalComponents/Shared/404Route';
import AddSelectPortfolio from './add-to-portfolio-modal';
import './platform.scss';

class Platform extends Component {
  state = {
    platformId: '',
    isKebabOpen: false,
    filteredItems: []
  };

  fetchData(apiProps) {
    this.props.fetchSelectedPlatform(apiProps);
    this.props.fetchPlatformItems(apiProps);
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.id);
    scrollToTop();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchData(this.props.match.params.id);
      scrollToTop();
    }
  }

  filterItems = (filterValue) => {
    let filteredItems = [];
    if (this.props.portfolioItems && this.props.portfolioItems.portfolioItems) {
      filteredItems = this.props.portfolioItems.portfolioItems;
      filteredItems = filteredItems.filter(({ name }) => name.toLowerCase().includes(filterValue.toLowerCase()));
    }

    return filteredItems;
  };

  renderPlatformItems = ({ title, filteredItems, addToPortfolioRoute, addSelectPortfolioRoute, editPlatformRoute }) => (
    <Fragment>
      { (!this.props.isLoading) &&
        <div className="toolbar-padding">
          <PlatformActionToolbar title={ title }
            filterItems={ this.filterItems }
            editPlatformRoute={ editPlatformRoute }
            addToPortfolioRoute={ addToPortfolioRoute }
            addSelectPortfolioRoute={ addSelectPortfolioRoute }
          />
        </div>
      }
      <Route exact path="/platform/:id/edit-platform" component={ EditPlatformModal } />
      <ContentGallery { ...filteredItems } />
    </Fragment>
  )

  renderAddToPortfolio = ({ platformRoute, addSelectPortfolioRoute }) => (
    <AddToPortfolio
      platform={ this.props.platform }
      platformItems={ this.props.platformItems }
      platformRoute={ platformRoute }
      addSelectPortfolioRoute={ addSelectPortfolioRoute }
    />
  );

  render() {
    const platformRoute = this.props.match.url;
    const addSelectPortfolioRoute = `${this.props.match.url}/add-select-portfolio`;
    const addToPortfolioRoute = `${this.props.match.url}/add-to-portfolio`;
    const editPlatformRoute = `${this.props.match.url}/edit-platform`;
    let filteredItems = {
      items: this.props.platformItems.map(data => <PlatformItem key={ data.id } { ...data } />),
      isLoading: this.props.isPlatformDataLoading
    };

    let title = this.props.platform ? this.props.platform.name : '';

    return (
      <Switch>
        <Route path="/platform/:id/add-to-portfolio"
          render={ props => this.renderAddToPortfolio({ platformRoute, addSelectPortfolioRoute, ...props }) } />
        <Route path="/platform/:id/add-select-portfolio" component={ AddSelectPortfolio } />
        <Route
          path="/platform/:id"
          render={ props => this.renderPlatformItems({ addSelectPortfolioRoute,
            addToPortfolioRoute,
            editPlatformRoute,
            filteredItems,
            title,
            ...props }) }
        />
        <Route component={ NoMatch } />
      </Switch>
    );
  }
}

const mapStateToProps = ({ platformReducer: { selectedPlatform, platformItems, isPlatformDataLoading }}) => ({
  platform: selectedPlatform,
  platformItems: selectedPlatform && platformItems[selectedPlatform.id],
  isPlatformDataLoading: !selectedPlatform || isPlatformDataLoading
});

const mapDispatchToProps = dispatch => ({
  fetchSelectedPlatform: platformId => dispatch(fetchSelectedPlatform(platformId)),
  fetchPlatformItems: apiProps => dispatch(fetchPlatformItems(apiProps))
});

Platform.propTypes = {
  filteredItems: PropTypes.object,
  isPlatformDataLoading: PropTypes.bool,
  match: PropTypes.object,
  fetchPlatformItems: PropTypes.func.isRequired,
  fetchSelectedPlatform: PropTypes.func,
  platform: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string.isRequired
  }),
  platformItems: PropTypes.array
};

Platform.defaultProps = {
  platformItems: []
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Platform));
