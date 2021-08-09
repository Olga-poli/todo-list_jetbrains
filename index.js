//variables assigning
let taskList = document.getElementById('task-list');
let inputTask = document.getElementById('input-task');
let addTaskButton = document.getElementById('add-task-button');
let tasks = [];

window.addEventListener("load", function (event) {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // console.log(tasks);
    tasks.forEach((taskText) => createNewTask(taskText))
});

//Event listeners
addTaskButton.addEventListener('click', validateForm);

//creating new task
function createNewTask(taskText) {
    let newTaskItem = document.createElement('li');
    let newTaskCheckbox = document.createElement('input');
    let newTaskText = document.createElement('span');
    let newTaskDeleteButton = document.createElement('button');
    let newTaskDeleteButtonIcon = document.createElement('i');

    //prepare task item
    newTaskCheckbox.setAttribute("type", "checkbox");
    newTaskText.setAttribute("class", "task");
    newTaskDeleteButton.setAttribute("class", "delete-btn");
    newTaskDeleteButtonIcon.setAttribute("class", "fas fa-times")

    newTaskItem.appendChild(newTaskCheckbox);
    newTaskText.innerHTML = taskText;
    newTaskItem.appendChild(newTaskText);
    newTaskDeleteButton.appendChild(newTaskDeleteButtonIcon);
    newTaskItem.appendChild(newTaskDeleteButton);

    taskList.appendChild(newTaskItem);
    // tasks.push(taskText);

    //clearing input field
    inputTask.value = '';

    //deleting task
    newTaskDeleteButton.addEventListener('click', deleteTask)

    //mark task as done
    newTaskCheckbox.addEventListener('change', function () {
        if (this.checked) {
            newTaskText.classList.add('task-done');
        } else {
            newTaskText.classList.remove('task-done');
        }
    })
}

function deleteTask(e) {
    localStorageDelete(e.target.closest("li").querySelector("span").innerHTML)
    console.log(e.target.closest("li").querySelector("span").innerHTML)
    e.target.closest("li").remove();
}

function validateForm() {
    let inputFieldValue = inputTask.value;
    if (inputFieldValue === "") {
        alert("A task must have a name to be successfully added to a task list");
        return false;
    } else {
        if (localStorageAdd(inputFieldValue) === true) {
            createNewTask(inputFieldValue);
        }
    }
}

function localStorageAdd(item) {
    tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    // let value = inputTask.value;
    if (tasks.indexOf(item) === -1) {
        tasks.push(item);
        window.localStorage.setItem("tasks", JSON.stringify(tasks));
        return true
    } else {
        alert("this task already exist")
    }
}

function localStorageDelete(someText) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i] === someText) {
            console.log(tasks[i])
            tasks.splice(i, 1);
            window.localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }
}