// variables
const currTodo = document.querySelector('.currTodo');
const addBtn = document.querySelector('.addBtn');
const todoDOM = document.querySelector('.todos');
const pending = document.querySelector('.pend');
const clearAll = document.querySelector('.clearall');

// UI

class UI {

    // adding todos
    addTodo() {
        this.updatePend();
        this.clearAll();
        addBtn.addEventListener('click', () => {
            if (currTodo.value) {
                const todo = document.createElement('li');
                todo.innerHTML = `${currTodo.value} <i class="fas fa-trash delete"></i>`;
                todo.querySelector('.delete').addEventListener('click', () => {
                    todo.remove();
                    this.updatePend();
                })
                todoDOM.appendChild(todo);
                currTodo.value = '';
                this.updatePend();
            }
        })
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
            this.updatePend();
        })
    }
}

// Storage

class Storage {

}

// Dom loaded

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.addTodo();
})