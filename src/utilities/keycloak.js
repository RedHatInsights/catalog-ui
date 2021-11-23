import Keycloak from 'keycloak-js';

const _keycloak = new Keycloak('./keycloak.json');

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 * @param onAuthenticatedCallback
 */
const initKeycloak = (onAuthenticatedCallback) => {
  _keycloak
    .init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256'
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log('user is not authenticated..!');
      }

      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = _keycloak.login;

const doLogout = _keycloak.logout;

const getToken = () => _keycloak.token;

const isLoggedIn = () => !!_keycloak.token;

const updateToken = (successCallback) =>
  _keycloak
    .updateToken(5)
    .then(successCallback)
    .catch(doLogin);

const getUsername = () => _keycloak.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _keycloak.hasRealmRole(role));

const CatalogAuth = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole
};

export default CatalogAuth;
