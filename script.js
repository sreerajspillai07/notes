let form = document.getElementById("form");
let textInput = document.getElementById("textInput")
let msg = document.getElementById("msg")
let dateInput = document.getElementById("dateInput")
let textArea = document.getElementById("textArea")
let tasks = document.getElementById("tasks")
let add = document.getElementById("add")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formvalidation();
})


form.addEventListener("cancel", (e) => {
    e.preventDefault();
    formvalidation();
  });



let formvalidation = () => {
    if (textInput.value === "") {
        console.log("failure")
        msg.innerHTML = "Task cannot be blank"
    } else {
        console.log("success")
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
        add.setAttribute("data-bs-dismiss", "");
        })()
         }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textArea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));

  

  console.log(data);
  createTasks();
};

let createTasks = () => {

    data.map((a, b) => {
        tasks.innerHTML=""
        return  (tasks.innerHTML += ` <div id=${b}>
        <span class="fw-bold">${a.text}</span>
        <span class="small text-secondary">${a.date}</span>
        <p>${a.description}</p>
        <span class="options">
           <i onClick="editTask(this)"  data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
           <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        </span>
       </div>`);
    })
   
     resetForm();
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    
  };

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML; 
    deleteTask(e);
}


let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
};
  
(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
  })();