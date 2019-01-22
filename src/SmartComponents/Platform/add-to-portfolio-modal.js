import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Button, Stack, Card } from '@patternfly/react-core';
import { addNotification } from '@red-hat-insights/insights-frontend-components/components/Notifications';
import { addToPortfolio, fetchPortfolios } from '../../redux/Actions/PortfolioActions';
import Select from 'react-select';
import '../../App.scss';

const AddSelectPortfolioModal = ({
  history: { goBack, go },
  addPortfolio,
  fetchPortfolios,
  onPortfolioSelectionChange,
  portfolios
}) => {
  const onSubmit = data => addToPortfolio(data).then(fetchPortfolios()).then(go(-2));

  const onCancel = () => goBack();

  const dropdownItems = portfolios.map(portfolio => ({ value: portfolio.id, label: portfolio.name, portfolio: portfolio.id }));

  return (
    <Modal
      isLarge
      title={ 'Add Products To Portfolio' }
      isOpen
      onClose={ onCancel }
      actions={ [
        <Button variant="secondary" key='cancel' onClick={ onCancel }>Cancel</Button>,
        <Button variant="primary" key='add' onClick={ onSubmit }>  Add  </Button>
      ] }
    >
      <Stack>
        <Card className='elipsis-text-overflow' style={ { height: '200px' } }>
          <Select
            isMulti={ true }
            placeholder={ 'Choose portfolio(s)' }
            options={ dropdownItems }
            onChange={ onPortfolioSelectionChange }
            closeMenuOnSelect={ false }
          />
        </Card>
        <Button variant="secondary" key='new' >Add new portfolio</Button>
      </Stack>
    </Modal>
  );
};

AddSelectPortfolioModal.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  addPortfolio: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  fetchPortfolios: PropTypes.func.isRequired,
  onPortfolioSelectionChange: PropTypes.func.isRequired,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddSelectPortfolioModal));
