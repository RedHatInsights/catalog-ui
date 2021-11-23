import React from 'react';
import { Provider } from 'react-redux';
import store from '../../utilities/store';
import { IntlProvider } from 'react-intl';
import Router from './AppStandalone';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../../utilities/keycloak';

const AppEntry = () => {
  console.log('%c Catalog UI started in standalone mode', 'color: blue');
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Provider store={store(true)}>
        <IntlProvider locale="en">
          <Router />
        </IntlProvider>
      </Provider>
    </ReactKeycloakProvider>
  );
};

export default AppEntry;
