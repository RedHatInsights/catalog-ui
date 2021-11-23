const webpackBase = require('./webpack.base.config');

// Used for getting the correct host when running in a container
const proxyHost = process.env.ANSIBLE_CATALOG_API_PROXY_HOST || 'localhost';
const proxyPort = process.env.ANSIBLE_CATALOG_API_PROXY_PORT || '5001';
const apiBasePath =
  process.env.ANSIBLE_CATALOG_API_BASE_PATH || '/api/ansible-catalog/v1';

module.exports = webpackBase({
  // The host where the API lives. EX: https://localhost:5001
  API_HOST: 'http://catalog.k8s.local',

  // Path to the API on the API host. EX: /api/ansible-catalog
  API_BASE_PATH: apiBasePath,

  // Port that the UI is served over
  UI_PORT: 8002,

  // Determines if the app should be compiled to run on insights or on
  // another platform. Options: insights, standalone
  DEPLOYMENT_MODE: 'standalone',

  // Serve the UI over http or https. Options: true, false
  UI_USE_HTTPS: false,

  // Enables webpack debug mode. Options: true, false
  UI_DEBUG: true,

  // Target compilation environment. Options: dev, prod
  TARGET_ENVIRONMENT: 'dev',

  // Value for webpack.devServer.proxy
  // https://webpack.js.org/configuration/dev-server/#devserverproxy
  // used to get around CORS requirements when running in dev mode
  WEBPACK_PROXY: {
    '/api/': `http://${proxyHost}:${proxyPort}`
  }
});
