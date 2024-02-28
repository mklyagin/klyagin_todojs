const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
const checkAll = document.querySelector('#check-all-checkbox');
const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');

const ENTER_KEY = 'Enter';

let taskList = [];

const taskRender = () => {
  let listOfTasks = '';
  taskList.forEach((task) => {
    listOfTasks
    += `<li id=${task.id}>
    <input type='checkbox'></input>
    <span>${task.title}</span>
    <button type='button' id='deleteTaskButton'>X</button>
    </li>`;
  });
  ulTask.innerHTML = listOfTasks;
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
  switch (event.target.type) {
    case 'checkbox':
      taskList.forEach((task) => {
        if (task.id === Number(event.target.parentNode.id)) {
          task.isDone = event.target.checked;
        }
      });
      break;
    case ('button'):
      taskList = taskList.filter((task) => Number(task.id) !== Number(event.target.parentNode.id));
      taskRender();
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
  taskList = taskList.filter((task) => task.isDone === false);
  taskRender();
};

const checkboxStateListener = () => {
  console.log(checkAll);
  if (taskList.every((task) => task.isDone)) {
    checkAll.checked = true;
  } else {
    checkAll.checked = false;
  }
};

ulTask.addEventListener('click', eventUlHandlerListener);
buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
deleteAllCompletedButton.addEventListener('click', deleteCompleted);
checkAll.addEventListener('onchange', checkboxStateListener);
