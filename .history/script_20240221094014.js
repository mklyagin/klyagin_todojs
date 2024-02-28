const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');

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
      console.log(event.target);
      const checkedTask = taskList.filter((task) => Number(task.id) === Number(event.target.parentNode.id));
      checkedTask.isDone = !(checkedTask.isDone);
      console.log(checkedTask.title, '   ', checkedTask.isDone);
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

ulTask.addEventListener('click', eventUlHandlerListener);
buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
