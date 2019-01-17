import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// replace with data driven form
import Form from 'react-jsonschema-form';
import { Bullseye, Button, Radio, Title, Form as PFForm } from '@patternfly/react-core';
import '../../Utilities/jschema.scss';
import { fetchServicePlans, sendSubmitOrder } from '../../redux/Actions/OrderActions';

const optionRow = (plan, option, selected_id, onChange) => {
  return (
    <div>
      <Radio
        value={ plan.id }
        checked={ selected_id === plan.id }
        name={ plan.name }
        aria-label={ plan.description }
        onChange={ onChange }
      />
      { plan.description }
    </div>);
};

class OrderServiceFormStepConfiguration extends React.Component {
  state = {
    showOrder: false,
    activeStepIndex: 1,
    selectedPlan: null,
    selectedPlanIdx: 0
  };

  componentDidMount() {
    const { id } = this.props;
    this.props.fetchPlans(id);
  }

  handlePlanChange = (arg, event) =>  {
    const plan = event.currentTarget.value;
    this.setState({ selectedPlan: plan });
  };

  planOptions = () => {
    let selected_id = this.state.selectedPlan ? this.state.selectedPlan : this.props.servicePlans[0].id;
    let onChange = this.handlePlanChange;

    return this.props.servicePlans.map((plan, option) => optionRow(plan, option, selected_id, onChange));
  }

  onSubmit = (data) => {
    const portfolioItemId = this.props.id;
    const service_plan_id = this.props.servicePlans[this.state.selectedPlanIdx].id;
    sendSubmitOrder({ portfolio_item_id: portfolioItemId, service_plan_ref: service_plan_id, service_parameters: data.formData });
    this.props.hideModal();
  };

  render() {
    if (!this.props.isLoading) {
      return (
        <React.Fragment>
          <Title> Configuration </Title>
          <PFForm>
            { (this.props.servicePlans.length > 1) &&
                  <div>
                    <Title>Select Plan:</Title>
                    <div>{ this.planOptions() }</div>
                  </div>
            }
            <div>
              { (!this.props.isLoading && this.props.servicePlans.length > 0) &&
                    <Form schema={ this.props.servicePlans[this.state.selectedPlanIdx].create_json_schema } onSubmit={ this.onSubmit }>
                      <div>
                        <Button variant="primary" type="submit">Submit</Button>
                      </div>
                    </Form>
              }
            </div>
          </PFForm>
        </React.Fragment>
      );
    }

    return (
      <PFForm>
        <Bullseye>
          <div>
            { this.props.isLoading && (<span color={ '#00b9e4' }> Loading...</span>) }
          </div>
        </Bullseye>
      </PFForm>
    );
  }
}

OrderServiceFormStepConfiguration.propTypes = {
  orderData: propTypes.func,
  fetchPlans: propTypes.func,
  hideModal: propTypes.func,
  showOrder: propTypes.bool,
  isLoading: propTypes.bool,
  serviceData: propTypes.object,
  servicePlans: propTypes.array,
  stepParametersValid: propTypes.bool,
  fulfilled: propTypes.bool,
  error: propTypes.bool,
  imageUrl: propTypes.string,
  id: propTypes.string,
  name: propTypes.string
};

const mapStateToProps = ({ orderReducer: { isLoading, servicePlans }}) => ({
  isLoading,
  servicePlans
});

const mapDispatchToProps = dispatch => ({
  fetchPlans: (portfolioItemId) => dispatch(fetchServicePlans(portfolioItemId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderServiceFormStepConfiguration);
