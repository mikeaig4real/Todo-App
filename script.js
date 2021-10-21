// variables
const currTodo = document.querySelector('.currTodo');
const addBtn = document.querySelector('.addBtn');
const todoDOM = document.querySelector('.todos');
const pending = document.querySelector('.pend');
const clearAll = document.querySelector('.clearall');

// UI


let tasks = [];

class UI {

    // adding todos
    addTodo() {
        let prevTodos = Storage.getTodo();
        if (prevTodos) {
            prevTodos.forEach(todo => {
                this.createTodo(todo);
            });
        }
        this.updatePend();
        this.clearAll();
        addBtn.addEventListener('click', () => {
            if (currTodo.value) {
                this.createTodo(currTodo.value);
            }
        })
    }

    // create a todo

    createTodo(item) {
        const todo = document.createElement('li');
        todo.innerHTML = `${item} <i class="fas fa-trash delete"></i>`;
        todo.querySelector('.delete').addEventListener('click', () => {
            tasks = [...tasks].filter(task => task!=item);
            Storage.saveTodo();
            todo.remove();
            this.updatePend();
        })
        todoDOM.appendChild(todo);
        tasks = [...tasks, item];
        currTodo.value = '';
        Storage.saveTodo();
        this.updatePend();
    }

    // pending task 
    updatePend() {
        pending.innerText = todoDOM.children.length;
    }

    // clear all
    clearAll() {
        clearAll.addEventListener('click', () => {
            while (todoDOM.firstChild) {
                todoDOM.removeChild(todoDOM.firstChild);
            }
            tasks = [];
            Storage.saveTodo();
            this.updatePend();
        })
    }
}

// Storage

class Storage {
    static saveTodo() {
        localStorage.setItem('todos', JSON.stringify([...tasks]));
    }

    static getTodo() {
        return JSON.parse(localStorage.getItem('todos'));
    }
}

// Dom loaded

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.addTodo();
})
