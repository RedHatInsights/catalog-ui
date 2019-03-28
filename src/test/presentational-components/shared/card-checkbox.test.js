import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CardCheckbox from '../../../presentational-components/shared/card-checkbox';

describe('<CardCheckbox />', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      handleCheck: jest.fn(),
      isChecked: false,
      id: 'foo-id'
    };
  });

  it('should render correctly', () => {
    const wrapper = shallow(<CardCheckbox { ...initialProps }/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call handleCheck on checkbock click', () => {
    const wrapper = mount(<CardCheckbox { ...initialProps }/>);
    wrapper.find('svg').simulate('click');
    expect(initialProps.handleCheck).toHaveBeenCalledWith(expect.any(Object));
  });
});
