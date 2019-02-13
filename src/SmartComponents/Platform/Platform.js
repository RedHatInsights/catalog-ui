import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Title } from '@patternfly/react-core';
import { fetchSelectedPlatform, fetchPlatformItems } from '../../redux/Actions/PlatformActions';
import ContentGallery from '../../SmartComponents/ContentGallery/ContentGallery';
import PlatformToolbar from '../../PresentationalComponents/Platform/PlatformToolbar';
import PlatformItem from '../../PresentationalComponents/Platform/PlatformItem';
import { scrollToTop } from '../../Helpers/Shared/helpers';
import './platform.scss';

class Platform extends Component {
  state = {
    filterValue: '',
    currentOffset: 0
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

  handleFilterChange = filterValue => this.setState({ filterValue });

  handlePageChange = page => this.props.fetchPlatformItems(this.props.match.params.id, page).then(this.setState({ currentOffset: parseInt(page, 10) }))

  render() {
    let filteredItems = {
      items: this.props.platformItems
      .filter(({ name }) => name.toLowerCase().includes(this.state.filterValue.toLowerCase()))
      .map(data => <PlatformItem key={ data.id } { ...data } />),
      isLoading: this.props.isPlatformDataLoading
    };
    const { currentOffset } = this.state;
    let title = this.props.platform ? this.props.platform.name : '';

    return (
      <Fragment>
        <PlatformToolbar searchValue={ this.state.filterValue } onFilterChange={ this.handleFilterChange }/>
        <div className="toolbar-padding">
          { title &&  (<Title size={ '2xl' } > { title }</Title>) }
        </div>
        <div>
          <button disabled={ currentOffset.toString() === this.props.paginationOffsets.first } onClick={ () => this.handlePageChange(this.props.paginationOffsets.prev) }>Prev</button>
          <button
            disabled={ currentOffset.toString() === this.props.paginationOffsets.last }
            onClick={ () => this.handlePageChange(this.props.paginationOffsets.next) }
          >
            Next
          </button>
        </div>
        <ContentGallery { ...filteredItems }/>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ platformReducer: { selectedPlatform, platformItems, isPlatformDataLoading }}) => ({
  platform: selectedPlatform,
  platformItems: selectedPlatform && platformItems[selectedPlatform.id] && platformItems[selectedPlatform.id].data,
  paginationOffsets: selectedPlatform && platformItems[selectedPlatform.id] && platformItems[selectedPlatform.id].links,
  isPlatformDataLoading: !selectedPlatform || isPlatformDataLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchSelectedPlatform,
  fetchPlatformItems
}, dispatch);

Platform.propTypes = {
  filteredItems: PropTypes.object,
  isPlatformDataLoading: PropTypes.bool,
  match: PropTypes.object,
  fetchPlatformItems: PropTypes.func.isRequired,
  fetchSelectedPlatform: PropTypes.func,
  platform: PropTypes.shape({
    name: PropTypes.string
  }),
  platformItems: PropTypes.array,
  paginationOffsets: PropTypes.object
};

Platform.defaultProps = {
  platformItems: [],
  paginationOffsets: {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Platform);
