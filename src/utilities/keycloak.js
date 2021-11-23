import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://catalog.k8s.local/login/keycloak-oidc',
  realm: 'Aap',
  clientId: 'catalog'
};

const keycloak = new Keycloak(keycloakConfig);
console.log('Keycloak: ', keycloak);

export default keycloak;
