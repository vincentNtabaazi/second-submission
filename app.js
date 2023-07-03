// Selectors
const todoInput = document.querySelector('.user-todo ')
const todoButton = document.querySelector('.user-todo-button ')
const todoList = document.querySelector('.user-todo-list ')
const progressButton = document.querySelector('.progress')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', progressBar2);

//Functions
function addTodo(event) {
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodo(todoInput.value);
  const completedButton = document.createElement('button');
  completedButton.innerHTML = "<i class='fas fa-check'></i>";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  const trashButton = document.createElement('button');
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(e) {
  const actionOnTodo = e.target;
  if (actionOnTodo.classList[0] === "trash-btn") {
    const actualdelTodo = actionOnTodo.parentElement;
    actualdelTodo.classList.add("explode-div");
    removeLocalTodos(actualdelTodo);
    actualdelTodo.addEventListener('animationend', function () {
      actualdelTodo.remove();
    });
  }
  if (actionOnTodo.classList[0] === "complete-btn") {
    const completedtodo = actionOnTodo.parentElement;
    completedtodo.classList.toggle("completed");
  }
}

function progressBar2(e) {
  const actionOnTodo = e.target;
  var completed = 0;
  var incomplete = 0;
  if (actionOnTodo.classList[0] === "complete-btn") {

    var unorderedList = document.getElementById('your-list-id');
    var divElements = unorderedList.getElementsByTagName('div');
    for (var i = 0; i < divElements.length; i++) {
      var div = divElements[i];
      var className = div.className;
      if (className === "todo") {
        incomplete++;
      } else {
        completed++;
      }
    }
    var result = completed / (incomplete + completed) * 100
    var roundedNumber = result.toFixed(0);
    console.log(roundedNumber)

    var elem = document.getElementById("myBar2");
    width = roundedNumber;
    var id = setInterval(frame, 10);
    function frame() {
      if (width > 100) {
        clearInterval(id);
      } else {
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";

      }
    }
   } 
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log(todo);
}
