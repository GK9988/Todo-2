// Selectors

const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', buttonCheck)
filterOption.addEventListener('click', filterTodo)
document.addEventListener('DOMContentLoaded', getTodos)


// Functions

function addTodo (event) {
    // Prevent form from submit and reload
    event.preventDefault()
    // create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    // create li
    const newTodo = document.createElement('li')
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value
    todoDiv.appendChild(newTodo)
    // Add Todo To local storage
    saveLocalTodos(todoInput.value)

    // create check button
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)
    // create delete button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)

    // append to list
    todoList.appendChild(todoDiv)
    // Clear input field value
    todoInput.value = ''
} 

function buttonCheck (e) {
    const item = e.target
    // delete Todo
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement
        // animation/transition
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }

    // Check mark
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        todo.classList.add('completed')
    }
}

function filterTodo (e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch (e.target.value){
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                    
                }
                else{
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'none'
                    
                }
                else{
                    todo.style.display = 'flex'
                }
                break
        }
    })
}

function saveLocalTodos (todo){
    let todos
    if (localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos () {
    let todos
    if (localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo) {
            // create div
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        // create li
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo-item')
        newTodo.innerText = todo
        todoDiv.appendChild(newTodo)

        // create check button
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class = "fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)
        // create delete button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)

        // append to list
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo){
    let todos
    if (localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todos.indexOf(todo.children[0].innerText)
    todos.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}