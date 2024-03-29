'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
let todoData = [];
let todoDataCheck = [];

const intoLocalStorage = function () {
    let json = JSON.stringify(todoData);
    localStorage.setItem('todo', json)
}

const outLocalStorage = function () {
    let noJson;
    noJson = localStorage.getItem('todo'); 
    todoDataCheck = JSON.parse(noJson);
    if (todoDataCheck === null) {
        todoData = [];
    } else {
        todoData = todoDataCheck;      
    }
}

// console.log('outLocalStorage();: ', outLocalStorage());//тут странно. если его нет. то не работает

const render = function () {

    headerInput.value = '';
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        if (item.value === '') {
            return
        } else {
            li.classList.add('todo-item');
            li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
                '</div>';
        }

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li)
        }
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function () {
            item.completed = !item.completed;
            console.log('нажимаю');
            render();
        })
        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function () {
            let a = todoData.indexOf(item);
            todoData.splice(a, 1);
            render();
        })
    })
    intoLocalStorage();    
}

todoControl.addEventListener('submit', function (event) {
    event.preventDefault(); // нажатие плюсика или ввода не перезагружают страницу
    const newTodo = {
        value: headerInput.value,
        completed: false //флаги
    }
    todoData.push(newTodo)
    render();
})

outLocalStorage();
render(); //Нужен для загрузки из LocalStorage
