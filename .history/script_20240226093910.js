const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
const checkAllCheckbox = document.querySelector('#check-all-checkbox');
const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');
const tabulationDiv = document.querySelector('#tabulation');

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

let taskList = [];
let filterType = 'all';

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
    <input class="edit-task" id=${task.id} value=${task.title} hidden>
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
  } else {
    target.previousElementSibling.hidden = !target.previousElementSibling.hidden;
  }
};

const editMode = (event) => {
  if (event.key === ESCAPE_KEY) {
    taskRender();
  } else if (event.key === ENTER_KEY || (event.type === 'blur' && event.sourceCapabilities !== null)) {
    editVisibilityToggle(event.target.previousElementSibling);
    taskList.forEach((task) => {
      if (task.id === Number(event.target.id)) {
        task.title = event.target.value;
      }
    });
    taskRender();
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
    default:
      break;
  }
};

const editTaskListener = (event) => {
  if (event.target.className === 'task-title') {
    editVisibilityToggle(event.target);
    event.target.nextElementSibling.addEventListener('blur', editMode);
    event.target.nextElementSibling.addEventListener('keydown', editMode);
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

const tabulationListener = (event) => {
  switch (event.target.id) {
    case ('show-all'):

    break;
    case('show-active'):

    break;
    case('show-completed'):

    break;
};

ulTask.addEventListener('click', eventUlHandlerListener);
ulTask.addEventListener('dblclick', editTaskListener);
buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
deleteAllCompletedButton.addEventListener('click', deleteCompleted);
checkAllCheckbox.addEventListener('click', checkAll);
tabulationDiv.addEventListener('click', tabulationListener);
