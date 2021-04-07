// Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.
// Problem: User interaction does not provide the correct results.
// Solution: Add interactivity so the user can manage daily tasks.
// Break things down into smaller steps and take each step at a time.
// Event handling, user interaction is what starts the code execution.
const taskInput = document.getElementById('new-task');//Add a new task.
const addButton = document.getElementsByTagName('button')[0];//first button
const incompleteTaskHolder = document.getElementById('incompleteTasks');//ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks');//completed-tasks
// New task list item
const createNewTaskElement = (taskString) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list__item');
    // input (checkbox)
    const checkBox = document.createElement('input');//checkbx
    // label
    const label = document.createElement('label');//label
    // input (text)
    const editInput = document.createElement('input');//text
    // button.edit
    const editButton = document.createElement('button');//edit button
    // button.delete
    const deleteButton = document.createElement('button');//delete button
    const deleteButtonImg = document.createElement('img');//delete button image

    label.innerText = taskString;
    label.classList.add('todo__list__label');
    // Each elements, needs appending
    checkBox.type = 'checkbox';
    checkBox.classList.add('input');
    checkBox.classList.add('input__checkbox');
    editInput.type = 'text';
    editInput.classList.add('input');
    editInput.classList.add('input__text');
    editInput.classList.add('input__invisible');
    editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
    editButton.classList.add('edit-button');
    editButton.classList.add('btn');
    deleteButton.classList.add('delete-button');
    deleteButton.classList.add('btn');
    deleteButtonImg.src = './remove.svg';
    deleteButtonImg.classList.add('delete-button__img');
    deleteButton.appendChild(deleteButtonImg);
    // and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}
const addTask = () => {
    console.log('Add Task...');
    // Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    // Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
}
const turnOffEditMode = (listItem) => {
    const label = listItem.querySelector('label');
    const containsClass = listItem.classList.contains('edit-mode');
    const editInput = listItem.querySelector('.input__invisible, .input__visible');
    const editBtn = listItem.querySelector('.edit-button');

    editInput.classList.toggle('input__invisible');
    editInput.classList.toggle ('input__visible');
    // If class of the parent is .editmode
    if (containsClass) {
        // switch to .editmode
        // label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }
    // toggle .editmode on the parent.
    listItem.classList.toggle('edit-mode');
};
// Edit an existing task.
const editTask = ({ target }) => {
    console.log('Edit Task...');
    console.log('Change \'edit\' to \'save\'');
    const listItem = target.parentNode;

    turnOffEditMode(listItem);
};
// Delete task.
const deleteTask = ({ target }) => {
    console.log('Delete Task...');
    const listItem = target.parentNode.parentNode;
    const ul = listItem.parentNode;

    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}
// Mark task completed
const taskCompleted = ({ target }) => {
    console.log('Complete Task...');
    // Append the task list item to the #completed-tasks
    const listItem = target.parentNode;
    const label = listItem.querySelector('.todo__list__label');

    if (listItem.classList.contains('edit-mode')) {
        turnOffEditMode(listItem);
    }
    label.classList.remove('todo__list__label');
    label.classList.add('completed__list__label');

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}
const taskIncomplete = ({ target }) => {
    console.log('Incomplete Task...');
    // Mark task as incomplete.
    // When the checkbox is unchecked
    // Append the task list item to the #incompleteTasks.
    const listItem = target.parentNode;
    const label = listItem.querySelector('.completed__list__label');

    label.classList.add('todo__list__label');
    label.classList.remove('completed__list__label');
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}
const ajaxRequest = () => {
    console.log('AJAX Request');
}
// The glue to hold it all together.
// Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);
const bindTaskEvents = (taskListItem, checkBoxEventHandler) => {
    console.log('bind list item events');
    // select ListItems children
    const checkBox = taskListItem.querySelector('.input__checkbox');
    const editButton = taskListItem.querySelector('.edit-button');
    const deleteButton = taskListItem.querySelector('.delete-button');

    // Bind editTask to edit button.
    editButton.addEventListener('click', editTask);
    // Bind deleteTask to delete button.
    deleteButton.addEventListener('click', deleteTask);;
    // Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange = checkBoxEventHandler;
}
// cycle over incompleteTaskHolder ul list items
// for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i += 1) {
    //bind events to list items children(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}
// cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i += 1) {
    //bind events to list items children(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
// Issues with usability don't get seen until they are in front of a human tester.
// prevent creation of empty tasks.
// Change edit to save when you are in edit mode.
