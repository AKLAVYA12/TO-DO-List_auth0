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
}


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
window.addEventListener('load', configureClient);

const darkModeBtn = document.getElementById("toggleDarkMode");

let theme = "dark";

darkModeBtn.addEventListener("click", function () {
  if(theme === "dark"){

  document.body.classList.remove("dark-mode");  
  darkModeBtn.textContent = "☀️";
  theme = "bright";

  } else{
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "🌙";
    theme = "dark";
  }
});


document.getElementById("addTaskBtn").addEventListener('click',()=>{
 
  
  const taskInput = document.getElementById("taskInput").value;
  const taskText = taskInput.trim();
  
  if (taskText === "") {
    window.alert("please enter a task");
    return;
  } else {
  
  const alltask = document.querySelectorAll(".task-text");
  const counter = alltask.length + 1;  

  const todoList = document.getElementById("todoList");

  const newTask = document.createElement('li');
  if (todoList.style.display === "none") {
    todoList.style.display = "inline";
  }
  
  newTask.className = "todo-item";

  newTask.innerHTML = `
    <div class="task-info">
      <span class="task-text" >${counter}. ${taskText}</span>
    </div>
    <div class="task-actions">
      <button class="edit-btn" title="Edit Task">✎</button>
      <button class="delete-btn" title="Delete Task">🗑️</button>
    </div>
  `;

    todoList.appendChild(newTask);

  
    function renumb() {
      const alltext = document.querySelectorAll(".task-text");
      alltext.forEach((thistext,index ) =>{
        const text = thistext.textContent;
        const taxtonly = text.split(". ").slice(1).join(". ");
        thistext.textContent = `${index}. ${taxtonly}`;
      }) 
    }

    newTask.querySelector(".delete-btn").addEventListener('click',() =>{
      if (confirm("Are you sure you want to delete this task?")) {
        newTask.remove();
        renumb();
      }
    });
  
  }
});

