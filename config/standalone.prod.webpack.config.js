const webpackBase = require('./webpack.base.config');

// Compile configuration for standalone mode
module.exports = webpackBase({
  API_HOST: '',
  API_BASE_PATH: '/api/catalog/',
  UI_BASE_PATH: '/ui/',
  DEPLOYMENT_MODE: 'standalone',
  NAMESPACE_TERM: 'namespaces',
  UI_USE_HTTPS: false,
  UI_DEBUG: false,
  TARGET_ENVIRONMENT: 'prod',
  WEBPACK_PUBLIC_PATH: '/static/catalog/',
});
