const btnNewTask = document.querySelector(".btn-new-task");
const inputValue = document.getElementById("inputValue");
const lists = document.querySelector(".lists");
let todoCheckBoxs;
//Array to store all todo items
let allTodos = [];

/**************************************************************
                     Functions 
 *************************************************************/
//Add new to do litst
const addNewTodo = function () {
  // prettier-ignore
  const date = getCurrentDate();
  const todoID = Date.now();
  if (!inputValue.value) return alert("The field can't be empty");

  if (inputValue.value.length < 5) return alert("Max chars is 5!");

  //Add todo info to the todolist array
  allTodos.push({
    id: todoID,
    date: date,
    todoName: inputValue.value,
  });

  //Display todo lists items
  displayTodoLists();

  //Reset input value
  inputValue.value = "";

  //Sotre todos in the browser localstorage
  localStorage.setItem("Todos", JSON.stringify(allTodos));
};

//Display to do list
const displayTodoLists = function () {
  lists.innerHTML = "";

  //sorting todo array
  const sortedTodos = allTodos.sort((a, b) => b.id - a.id);

  let output = "";
  allTodos.forEach((todo) => {
    output += `
  <li class="list" data-todoID="${todo.id}">
    <div class="card">
    <div class="card-head">
      <h3>Course</h3>
      <h3>Date</h3>
      <h3>Update</h3>
    </div>
    <div class="card-body">
    <div class='todo-name'>
      <input type="checkbox" name="${todo.todoName}" class="todo-check-box" ${
      todo.isCompleted === true ? "checked" : ""
    }>
      <span class="course">${todo.todoName}</span>
      </div>
      <span class="time">
        <span>${todo.date}</span>
      </span>
      <span class="update">
        <button class="btn edit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="todo-icon edit-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

        </button>
        <button class="btn delete">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="todo-icon delete-icon">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>

    
        </button>
      </span>
    </div>
    </div>
    </li>
  `;
  });

  lists.insertAdjacentHTML("afterbegin", output);
};

//Delete to do list
const deleteTodoList = function (e) {
  const listEl = e.target.closest("li");
  const listElId = Number(listEl.dataset.todoid);

  //find the index of the element from todo lists array
  const index = allTodos.findIndex((todo) => todo.id === listElId);

  //Delete the todo item from todo lists array
  allTodos.splice(index, 1);

  //Reset the local storage
  localStorage.setItem("Todos", JSON.stringify(allTodos));

  displayTodoLists();
};

//Update to do list
const updateTodoList = function (e) {
  //Fetch the id of the current todo
  const listEl = e.target.closest("li");
  const listElId = Number(listEl.dataset.todoid);
  const saveEditedTodo = document.querySelector(".btn-save-task");

  //find the index of the element from todo lists array
  const index = allTodos.findIndex((todo) => todo.id === listElId);

  //Populte the input field using the targeted todo
  inputValue.value = allTodos[index].todoName;

  document.querySelector(".btn-new-task").style.display = "none";
  saveEditedTodo.style.display = "block";

  //If the save button is click do the following
  saveEditedTodo.addEventListener("click", function (e) {
    e.preventDefault();

    allTodos[index].todoName = inputValue.value;
    allTodos[index].date = getCurrentDate();
    console.log("Successfuly edited");

    saveEditedTodo.style.display = "none";
    document.querySelector(".btn-new-task").style.display = "block";

    //Reset todos in the browser localstorage
    localStorage.setItem("Todos", JSON.stringify(allTodos));

    displayTodoLists();
  });
};

//Get date
const getCurrentDate = function () {
  // prettier-ignore
  const newDate = new Date();

  const year = newDate.getFullYear();
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const date = `${month}/${day}/${year}`;

  return date;
};

//Get data from the loca storage
const getLocalSotrageData = function () {
  const data = JSON.parse(localStorage.getItem("Todos"));

  if (!data) return;

  allTodos = data;
  console.log(allTodos);
};

//Mark to do lit as completed
const todoMarkCompleted = function (e) {
  const checkBox = e.target;
  const todEleId = e.target.closest("li").dataset.todoid;

  const todo = allTodos.find((todo) => todo.id === Number(todEleId));
  todo.isCompleted = checkBox.checked;

  if (checkBox.checked)
    checkBox.closest(".card-body").style.textDecoration = "line-through";

  if (!checkBox.checked)
    checkBox.closest(".card-body").style.textDecoration = "none";
};

//Get getLocalSotrageData
getLocalSotrageData();

//Display UI
displayTodoLists();
/**************************************************************
                           Events 
 *************************************************************/

btnNewTask.addEventListener("click", function (e) {
  e.preventDefault();
  addNewTodo();
});

//Event Delegation
lists.addEventListener("click", function (e) {
  if (e.target.closest(".delete")) deleteTodoList(e);
  if (e.target.closest(".edit")) updateTodoList(e);
  if (e.target.closest(".todo-check-box")) todoMarkCompleted(e);
});
