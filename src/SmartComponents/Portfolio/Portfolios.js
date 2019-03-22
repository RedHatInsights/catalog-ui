import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PortfolioCard from '../../PresentationalComponents/Portfolio/PorfolioCard';
import PortfoliosFilterToolbar from '../../PresentationalComponents/Portfolio/PortfoliosFilterToolbar';
import { fetchPortfolios } from '../../redux/Actions/PortfolioActions';
import AddPortfolio from './add-portfolio-modal';
import RemovePortfolio from './remove-portfolio-modal';
import SharePortfolio from './share-portfolio-modal';
import './portfolio.scss';
import { scrollToTop } from '../../Helpers/Shared/helpers';
import Portfolio from './Portfolio';
import TopToolbar, { TopToolbarTitle } from '../../PresentationalComponents/Shared/top-toolbar';

const portfoliosRoutes = {
  portfolios: '',
  detail: 'detail/:id'
};

class Portfolios extends Component {
  state = {
    filteredItems: [],
    isOpen: false,
    filterValue: ''
  };

  fetchData = () => {
    this.props.fetchPortfolios();
  };

  componentDidMount() {
    this.fetchData();
    scrollToTop();
  }

  onFilterChange = filterValue => this.setState({ filterValue })

  renderItems = props => {
    let filteredItems = {
      items: this.props.portfolios
      .filter(({ name }) => name.toLowerCase().includes(this.state.filterValue.trim().toLowerCase()))
      .map(item => <PortfolioCard key={ item.id } { ...item } />),
      isLoading: this.props.isLoading && this.props.portfolios.length === 0
    };
    return (
      <Fragment>
        <TopToolbar>
          <TopToolbarTitle title="Portfolios" />
          <PortfoliosFilterToolbar onFilterChange={ this.onFilterChange } filterValue={ this.state.filterValue }/>
        </TopToolbar>
        <Route { ...props } exact path="/portfolios/add-portfolio" component={ AddPortfolio } />
        <Route exact path="/portfolios/edit/:id" component={ AddPortfolio } />
        <Route exact path="/portfolios/remove/:id" component={ RemovePortfolio } />
        <Route exact path="/portfolios/share/:id" component={ SharePortfolio } />
        <ContentGallery { ...filteredItems } />
      </Fragment>
    );}

  render() {
    return (
      <Switch>
        <Route path={ `/portfolios/${portfoliosRoutes.detail}` } component={ Portfolio } />
        <Route path={ `/portfolios/${portfoliosRoutes.portfolios}` } render={ this.renderItems } />
      </Switch>
    );
  }
}

const mapStateToProps = ({ portfolioReducer: { portfolios, isLoading, filterValue }}) => ({
  portfolios,
  isLoading,
  searchFilter: filterValue
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolios: apiProps => dispatch(fetchPortfolios(apiProps))
});

Portfolios.propTypes = {
  filteredItems: propTypes.array,
  portfolios: propTypes.array,
  platforms: propTypes.array,
  isLoading: propTypes.bool,
  searchFilter: propTypes.string,
  showModal: propTypes.func,
  fetchPortfolios: propTypes.func.isRequired
};

Portfolios.defaultProps = {
  portfolios: []
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolios);
