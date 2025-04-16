
import { auth0Client , configureClient} from './auth.js';

//sessionStorage.clear();

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    const user = await auth0Client.getUser();
    sessionStorage.setItem("user",user.name);
    window.location.href = `${window.location.origin}/dashboard.html`;
  } else {
    console.log("not authenticated");
  }
};

const initAuth = async () => {
  await configureClient();
  await updateUI();
  setupEventListeners();
};

const setupEventListeners = () => {
  const login = document.getElementById("btn-login");
  if(login){
    login.addEventListener('click', async(e) =>{
      e.preventDefault();
      await auth0Client.loginWithPopup();
      await updateUI();
    })
  }
  };

window.addEventListener('load', initAuth);
