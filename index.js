const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todolist");
const filterOption = document.querySelector(".filter-todos");


todoButton.addEventListener("click" , addTodo);
function addTodo(e) {
    e.preventDefault();
    console.log(e);
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    const newTodo =
    `<li>${todoInput.value}</li>
    <span><i class="far fa-check-square"></i></span>
    <span><i class="far fa-trash-alt"></i></span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInput.value); 
    todoInput.value= "";
}


todoList.addEventListener("click" , checkRemove);
function checkRemove(v) {
    const classList = [...v.target.classList];
    const item = v.target;
    console.log(item.parentElement.parentElement);
    if (classList[1] === "fa-check-square") {
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed")
    }
    else if (classList[1] === "fa-trash-alt") {
        const todo = item.parentElement.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
}


filterOption.addEventListener("click", filterTodos);
function filterTodos(e) {
    console.log(todoList.childNodes);
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch(e.target.value) {
            case"all":
                todo.style.display = "flex";
                break;
            case "completed":
              if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
              }
              else{
                todo.style.display = "none";
              }
              break;
              case "uncompleted" :
                if (!todo.classList.contains("completed")) {
                  todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none"
                }
                break;
        }
    
    });
}

function saveLocalTodos(todo) {
   let savedTodos = localStorage.getItem("todos") 
    ? JSON.parse(localStorage.getItem("todos")) 
    : [];
   savedTodos.push(todo);
   localStorage.setItem("todos", JSON.stringify(savedTodos));

}

document.addEventListener("DOMContentLoaded", getLocalTodos);
function getLocalTodos () {
    let savedTodos = localStorage.getItem("todos") 
    ? JSON.parse(localStorage.getItem("todos")) 
    : [];
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")
        const newTodo =
        `<li>${todo}</li>
        <span><i class="far fa-check-square"></i></span>
        <span><i class="far fa-trash-alt"></i></span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let savedTodos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
    const filterTodos = savedTodos.filter(
        (t) => t !== todo.children[0].innerText
    );
        localStorage.setItem("todos", JSON.stringify(filterTodos));
}