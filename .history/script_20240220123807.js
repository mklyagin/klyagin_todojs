const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');

const ENTER_KEY = 'Enter';

const taskList = [];

const addTask = () => {
  const task = {
    title: inputTask.value,
    id: Date.now(),
    isDone: false,
  };

  taskList.push(task);
  console.log(taskList);
};

const inputTaskListener = (event) => {
  if (event.key === ENTER_KEY) {
    addTask();
    inputTask.blur();
  }
};

buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
