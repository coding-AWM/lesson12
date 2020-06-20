'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');
const todoData = [];

// const todoDataTest = [
//     {
//         value: 'Сварить кофу',
//         completed: false //флаги
//     },
//     {
//         value: 'Отмыть свинсуду',
//         completed: true //флаги
//     }
// ];

const render = function () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function (item) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if (item.completed) {
                todoCompleted.append(li);
            } else {
                todoList.append(li)
            }
            const btnTodoCompleted = li.querySelector('.todo-complete');
            btnTodoCompleted.addEventListener('click', function () {
                item.completed = !item.completed;
                render();
            })
            // const btnTodoRemove = li.querySelector('.todo-remove');
            // btnTodoRemove.addEventListener('click', function () {
            //     li.remove();
            //     // render();
            // })
    })
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
