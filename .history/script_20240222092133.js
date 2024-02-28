const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
const checkAllCheckbox = document.querySelector('#check-all-checkbox');
const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');

const ENTER_KEY = 'Enter';

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
    <span>${task.title}</span>
    <input class="edit-task">
    <button type="button">X</button>
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

const eventUlHandlerListener = (event) => {
  const eventTaskID = Number(event.target.parentNode.id);
  switch (event.target.type) {
    case 'checkbox':
      taskList.forEach((task) => {
        if (task.id === eventTaskID) {
          task.isDone = event.target.checked;
        }
        checkAllTaskStates();
      });
      break;
    case ('button'):
      taskList = taskList.filter((task) => task.id !== eventTaskID);
      taskRender();
      break;
    case ('text'):
      console.log(event.target.previousSibling);
      break;
    default:
      console.log(event.target.type);
      console.log(event.target.name);
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
