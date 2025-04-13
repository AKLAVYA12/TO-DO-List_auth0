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

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    console.log(`the name is ${user.name}`);
    console.log(`the email is ${user.email}`);
  } else {
    console.log("not authenticated");
  }
};

const initAuth = async () => {
  await configureClient();
  // Check for redirect callback after login
  // await handleRedirectCallback();
  await updateUI();
  setupEventListeners();
};

const setupEventListeners = () => {
  document.getElementById("btn-login").addEventListener('click', async (e) => {
    e.preventDefault();
    await auth0Client.loginWithPopup();
    await updateUI();
  });

  document.getElementById('btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  });
};

window.addEventListener('load', initAuth);
