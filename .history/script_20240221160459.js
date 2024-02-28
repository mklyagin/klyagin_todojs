const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
const checkAllCheckbox = document.querySelector('#check-all-checkbox');
const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');

const ENTER_KEY = 'Enter';

let taskList = [];

const checkAllTaskStates = () => {
  console.log(taskList.length);
  checkAllCheckbox.checked = taskList.length > 0 ? (taskList.every((task) => task.isDone)) : false;
};

const taskRender = () => {
  let listOfTasks = '';
  checkAllTaskStates();
  taskList.forEach((task) => {
    listOfTasks
    += `<li id=${task.id}>
    <input type="checkbox" class="check-task"></input>
    <span>${task.title}</span>
    <button type="button">X</button>
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
        checkAllTaskStates();
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
  console.log(taskList);
};

const checkAll = () => {
  taskList.forEach((task) => {
    task.isDone = checkAllCheckbox.checked;
    document.querySelectorAll('.check-task').forEach((checkbox) => {
      checkbox.checked = checkAllCheckbox.checked;
    });
  });
};

ulTask.addEventListener('click', eventUlHandlerListener);
buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
deleteAllCompletedButton.addEventListener('click', deleteCompleted);
checkAllCheckbox.addEventListener('click', checkAll);
