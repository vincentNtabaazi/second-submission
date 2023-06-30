// Selectors
const todoInput =document.querySelector('.user-todo ')
const todoButton =document.querySelector('.user-todo-button ')
const todoList =document.querySelector('.user-todo-list ') 

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click',deleteCheck);


//Functions
function addTodo(event){
  event.preventDefault();
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
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
  todoInput.value = "";
}

function deleteCheck(e){
  const actionOnTodo = e.target;
  if(actionOnTodo.classList[0] === "trash-btn"){
  const actualdelTodo = actionOnTodo.parentElement;
  actualdelTodo.classList.add("explode-div");
  actualdelTodo.addEventListener('animationend', function() {
  actualdelTodo.remove();
});
}
  }

  if(actionOnTodo.classList[0] === "complete-btn"){
    const completedtodo = actionOnTodo.parentElement;
    completedtodo.classList.toggle("completed"); 
  }
