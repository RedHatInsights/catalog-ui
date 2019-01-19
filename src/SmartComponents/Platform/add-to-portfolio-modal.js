import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button } from '@patternfly/react-core';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import { addPortfolio, fetchPortfolios } from '../../redux/Actions/PortfolioActions';
import Select from 'react-select';
import { pipe } from 'rxjs';

const AddToPortfolioModal = ({
  history: { goBack },
  addPortfolio,
  addNotification,
  fetchPortfolios,
  onOptionSelect,
  portfolios
}) => {
  const onSubmit = data => addPortfolio(data).then(fetchPortfolios()).then(goBack());

  const onCancel = () => pipe(
    addNotification({
      variant: 'warning',
      title: 'Add To Portfolio',
      description: 'Add to portfolio was cancelled by the user.'
    }),
    goBack()
  );

  const dropdownItems = portfolios.map(portfolio => ({ value: portfolio.id, label: portfolio.name, portfolio: portfolio.id }));

  return (
    <Modal
      title={ 'Add Products To Portfolio' }
      isOpen
      onClose={ onCancel }
    >
      <Select
        isMulti={ true }
        placeholder={ 'Filter by Platform' }
        options={ dropdownItems }
        onChange={ onOptionSelect }
        closeMenuOnSelect={ false }
      />
      <div>
        <Button variant="primary" onClick={onSubmit}>Submit</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </Modal>
  );
};

AddToPortfolioModal.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  addPortfolio: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  fetchPortfolios: PropTypes.func.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  portfolios: PropTypes.array
};

const mapStateToProps = ({ portfolioReducer: { portfolios }}) => ({
  portfolios
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addNotification,
  addPortfolio,
  fetchPortfolios
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddToPortfolioModal));
