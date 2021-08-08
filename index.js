//hard code tasks
let existingCheckboxes = Array.from(document.querySelectorAll("input[type=checkbox]"));

existingCheckboxes.forEach(function (item) {
    item.addEventListener('change', function (e) {
        if (this.checked) {
            e.target.nextElementSibling.classList.add('task-done');
        } else {
            e.target.nextElementSibling.classList.remove('task-done');
        }
    })
})

//variables assigning
let taskList = document.getElementById('task-list');
let inputTask = document.getElementById('input-task');
let addTaskButton = document.getElementById('add-task-button');

//Event listeners
addTaskButton.addEventListener('click', validateForm);

//creating new task
function createNewTask() {
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
    newTaskText.innerHTML = inputTask.value;
    newTaskItem.appendChild(newTaskText);
    newTaskDeleteButton.appendChild(newTaskDeleteButtonIcon);
    newTaskItem.appendChild(newTaskDeleteButton);

    taskList.appendChild(newTaskItem);

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
    e.target.parentNode.remove()
}

function validateForm() {
    let inputFieldValue = inputTask.value;
    if (inputFieldValue === "") {
        alert("A task must have a name to be successfully added to a task list");
        return false;
    } else {
        createNewTask();
    }
}

