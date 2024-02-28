const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
const checkAllCheckbox = document.querySelector('#check-all-checkbox');
const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

let taskList = [];

const checkAllTaskStates = () => {
  checkAllCheckbox.checked = taskList.length > 0
    ? (taskList.every((task) => task.isDone))
    : false;
};

const taskRender = () => {
  let listOfTasks = '';
  taskList.forEach((task) => {
    listOfTasks
    += `<li id=${task.id}>
    <input type="checkbox" class="check-task">
    <span class="task-title">${task.title}</span>
    <input class="edit-task" hidden>
    <button type="button" class="delete-task">X</button>
    </li>`;
  });
  ulTask.innerHTML = listOfTasks;
  checkAllTaskStates();
};

const addTask = () => {
  const task = {
    id: Date.now(),
    title: inputTask.value,
    isDone: false,
  };

  taskList.push(task);
  inputTask.value = '';
  taskRender();
};

const editVisibilityToggle = (target) => {
  target.hidden = !target.hidden;
  if (target.className === 'task-title') {
    target.nextElementSibling.hidden = !target.nextElementSibling.hidden;
    console.log('1', target.previousElementSibling);
  } else {
    target.previousElementSibling.hidden = !target.previousElementSibling.hidden;
    console.log(target.previousElementSibling);
  }
};

const saveEdit = (event) => {
  if (event.key === ESCAPE_KEY) {
    //this is for save (need remake to blur)
    event.target.previousElementSibling.innerHTML = `${event.target.value}`;
    editVisibilityToggle(event.target.previousElementSibling);
  }
};

const eventUlHandlerListener = (event) => {
  const eventTaskID = Number(event.target.parentNode.id);
  switch (event.target.className) {
    case 'check-task':
      taskList.forEach((task) => {
        if (task.id === eventTaskID) {
          task.isDone = event.target.checked;
        }
        checkAllTaskStates();
      });
      break;
    case ('delete-task'):
      taskList = taskList.filter((task) => task.id !== eventTaskID);
      taskRender();
      break;
    case ('task-title'):
      //target = span
      editVisibilityToggle(event.target);
      //event.target.hidden = !event.target.hidden;
      //event.target.nextElementSibling.hidden = !event.target.nextElementSibling.hidden;
      console.log(event.target.nextElementSibling.events);
      event.target.nextElementSibling.addEventListener('blur', saveEdit);
      event.target.nextElementSibling.addEventListener('keydown', saveEdit);
      break;
    default:
      break;
  }
};

const inputTaskListener = (event) => {
  if (event.key === ENTER_KEY) {
    addTask();
    inputTask.blur();
  }
};

const deleteCompleted = () => {
  taskList = taskList.filter((task) => !task.isDone);
  taskRender();
};

const checkAll = () => {
  taskList.forEach((task) => {
    task.isDone = checkAllCheckbox.checked;
    Array.from(ulTask.children).forEach((li) => {
      li.children[0].checked = checkAllCheckbox.checked;
    });
  });
};

ulTask.addEventListener('click', eventUlHandlerListener);
buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
deleteAllCompletedButton.addEventListener('click', deleteCompleted);
checkAllCheckbox.addEventListener('click', checkAll);
