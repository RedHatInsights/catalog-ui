const webpackBase = require('./webpack.base.config');

// Compile configuration for deploying to insights
module.exports = webpackBase({
  API_HOST: '',
  API_BASE_PATH: '/api/catalog/',
  UI_BASE_PATH: '',
  DEPLOYMENT_MODE: 'insights',
  UI_USE_HTTPS: false,
  UI_DEBUG: false,
  TARGET_ENVIRONMENT: 'prod',
  APPLICATION_NAME: 'Automation services catalog',
  USE_FAVICON: false,
});
