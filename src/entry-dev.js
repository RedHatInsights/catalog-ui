import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './utilities/store';
import Router from './router';
import App from './loaders/chrome/chrome-loader';
import { IntlProvider } from 'react-intl';

console.log('%c Catalog UI started in development mode', 'color: blue');

ReactDOM.render(
  <Provider store={store()}>
    <IntlProvider locale="en">
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);
