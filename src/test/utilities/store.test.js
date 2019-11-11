import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import store from '../../utilities/store';

describe('redux store', () => {
  it('should create redux store context', () => {
    const wrapper = mount(<Provider store={ store }><div>Foo</div></Provider>);
    const expectedState = {
      orderReducer: expect.any(Object),
      platformReducer: expect.any(Object),
      portfolioReducer: expect.any(Object),
      rbacReducer: expect.any(Object),
      shareReducer: expect.any(Object),
      notifications: expect.any(Object),
      openApiReducer: expect.any(Object)
    };
    expect(wrapper.props().store.getState()).toEqual(expectedState);
  });
});
