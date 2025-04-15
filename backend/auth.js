import { createAuth0Client } from 'https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@2.1.2/dist/auth0-spa-js.production.esm.js';

let auth0Client = null;

const auth0Config = {
  domain: 'dev-61ypcvnvoapapmov.us.auth0.com',
  clientId: 'UzIaFOxVoQOVKguBzgyBJLzwSAfjVKsa',
};

const configureClient = async () => {
  auth0Client = await createAuth0Client({
    domain: auth0Config.domain,
    clientId: auth0Config.clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
      scope: 'openid profile email'
    },
  });
  console.log('Auth0 client configured successfully.');
};

export {auth0Client , configureClient};