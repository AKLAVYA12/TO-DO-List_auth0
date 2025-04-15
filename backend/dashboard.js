import { auth0Client } from "./auth.js";

document.addEventListener('DOMContentLoaded', async () => {

  const name = sessionStorage.getItem("user");
  console.log(name);
  document.getElementById("display").textContent = `Welcome ${name}`;

  document.getElementById("logout").addEventListener('click', async (e) => {
    e.preventDefault();
    await auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
    sessionStorage.clear();
  });
});
