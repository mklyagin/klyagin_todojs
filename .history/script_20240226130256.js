const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
const checkAllCheckbox = document.querySelector('#check-all-checkbox');
const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');
const tabulationDiv = document.querySelector('#tabulation');
const paginationDiv = document.querySelector('#pagination');

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';
const QUANITY_OF_TASKS = 5;

let taskList = [];
let taskListPages = [[]];
let filterType = 'all';

const checkAllTaskStates = () => {
  checkAllCheckbox.checked = taskList.length
    ? (taskList.every((task) => task.isDone))
    : false;
};

const listToPages = () => {
  taskListPages = [[]];
  let index = 0;
  taskList.forEach((task) => {
    if (taskListPages.length === QUANITY_OF_TASKS) {
      taskListPages.push([]);
      index += 1;
    }
    taskListPages[index].append(task);
  });
};

const taskFilter = (currentList) => {
  switch (filterType) {
    case ('all'):
      return taskList;
    case ('active'):
      currentList = taskList.filter((task) => !task.isDone);
      return currentList;
    case ('completed'):
      currentList = taskList.filter((task) => task.isDone);
      return currentList;
    default:
      return undefined;
  }
};

const taskValidation = () => {
  taskList.forEach((task) => {
    task.title = task.title.trim();
  });
  taskList = taskList.filter((task) => task.title.length);
};

const taskFilterCounter = () => {
  const counter = {
    total: taskList.length,
    active: (taskList.filter((task) => !task.isDone)).length,
    completed: (taskList.filter((task) => task.isDone)).length,
  };

  return counter;
};

const taskRender = () => {
  let listOfTasks = '';
  let currentList = [];
  taskValidation();
  currentList = taskFilter(currentList);

  currentList.forEach((task) => {
    listOfTasks
    += `<li id=${task.id}>
    <input type="checkbox" class="check-task" ${task.isDone ? 'checked' : ''}>
    <span class="task-title">${task.title}</span>
    <input hidden class="edit-task" id=${task.id} value=${task.title} >
    <button type="button" class="delete-task">X</button>
    </li>`;
  });
  ulTask.innerHTML = listOfTasks;
  checkAllTaskStates();
  const tabNumbers = taskFilterCounter();
  tabulationDiv.children[0].innerHTML = `All (${tabNumbers.total})`;
  tabulationDiv.children[1].innerHTML = `Active (${tabNumbers.active})`;
  tabulationDiv.children[2].innerHTML = `Completed (${tabNumbers.completed})`;
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
    target.nextElementSibling.focus();
  } else {
    target.previousElementSibling.hidden = !target.previousElementSibling.hidden;
  }
};

const editMode = (event) => {
  if (event.target.className === 'edit-task') {
    if (event.key === ESCAPE_KEY) {
      taskRender();
    } else if (event.key === ENTER_KEY || (event.type === 'blur' && event.sourceCapabilities)) {
      event.target.value = event.target.value.trim();
      if (!event.target.value.length) {
        taskRender();
      } else {
        editVisibilityToggle(event.target.previousElementSibling);
        taskList.forEach((task) => {
          if (task.id === Number(event.target.id)) {
            task.title = event.target.value;
          }
        });
        taskRender();
      }
    }
  }
};

const eventUlHandlerListener = (event) => {
  const eventTaskID = Number(event.target.parentNode.id);
  const elemClass = event.target.className;
  if (elemClass === 'check-task') {
    taskList.forEach((task) => {
      if (task.id === eventTaskID) {
        task.isDone = event.target.checked;
      }
      checkAllTaskStates();
    });
    taskRender();
  } else if (elemClass === 'delete-task' && event.type === 'click') {
    taskList = taskList.filter((task) => task.id !== eventTaskID);
    taskRender();
  } else if (elemClass === 'task-title' && event.detail === 2) {
    editVisibilityToggle(event.target);
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
  });
  taskRender();
};

const tabulationListener = (event) => {
  switch (event.target.id) {
    case ('show-all'):
      filterType = 'all';
      taskRender();
      break;
    case ('show-active'):
      filterType = 'active';
      taskRender();
      break;
    case ('show-completed'):
      filterType = 'completed';
      taskRender();
      break;
    default:
      break;
  }
};

ulTask.addEventListener('click', eventUlHandlerListener);
ulTask.addEventListener('blur', editMode, true);
ulTask.addEventListener('keydown', editMode);
buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
deleteAllCompletedButton.addEventListener('click', deleteCompleted);
checkAllCheckbox.addEventListener('click', checkAll);
tabulationDiv.addEventListener('click', tabulationListener);
