// Fool TypeScript into thinking that we actually have typings for these components.
// This will tell typescript that anything from this module is of type any.

declare module 'react-markdown';
declare module 'react-router-hash-link';
declare module 'file-saver';
declare module '*.gif';
declare module '*.svg';

// Declare configuration globals here so that TypeScript compiles
declare let API_HOST;
declare let API_BASE_PATH;
declare let DEPLOYMENT_MODE;
declare let NAMESPACE_TERM;
declare let APPLICATION_NAME;
