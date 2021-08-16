/*
** Title: To do app
** Description: Using Vanilla Javascript
** Author: Fakrul Islam Robin
** Date:   14/08/2021
*/

let inputField = document.querySelector('#task_input');
let inputBtn = document.querySelector('#add_btn');
let form = document.querySelector('form');
let toDoUl = document.querySelector('#incomplete_items');
let complete = document.querySelector('#complete_items');


//Functions
let createTask = function (task) {
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');

    listItem.setAttribute('id', 'item');
    label.innerText = task;
    checkBox.type = 'checkbox';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function (event) {
    event.preventDefault();
    let listItem = createTask(inputField.value);
    toDoUl.appendChild(listItem);
    inputField.value = '';

    //bind the new item to the incomplete list
    bindInCompleteItems(listItem, completeTask);
}
let completeTask = function () {
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.setAttribute('id', 'delete_btn');
    listItem.appendChild(deleteBtn);

    //remove checkbox
    let checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.remove();

    //insert in complete list
    complete.appendChild(listItem);

    //bind coomplete task
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function () {
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

let bindInCompleteItems = function (taskItem, checkboxClick) {
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkboxClick;
}


let bindCompleteItems = function (taskItem, deleteButton) {
    let deleteBtn = taskItem.querySelector('#delete_btn');
    deleteBtn.onclick = deleteButton;
}


for (let i = 0; i < toDoUl.children.length; i++) {
    bindInCompleteItems(toDoUl.children[i], completeTask);
}
for (let i = 0; i < complete.children.length; i++) {
    bindCompleteItems(complete.children[i], deleteTask);
}
form.addEventListener('submit', addTask);

