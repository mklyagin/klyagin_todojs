const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');

const ENTER_KEY = 'Enter';

const taskList = [];

const taskRender = (task) => {
  let renderList = '';
  taskList.map(() => {
    renderList += `li name=${task.id} >task.title}</li>`;
    return renderList;
  });
  ulTask.innerHTML = renderList;
};

const addTask = () => {
  const task = {
    id: Date.now(),
    title: inputTask.value,
    isDone: false,
  };

  taskList.push(task);
  console.log(taskList);
  taskRender();
};

const inputTaskListener = (event) => {
  if (event.key === ENTER_KEY) {
    addTask();
    inputTask.blur();
  }
};

buttonTaskAdd.addEventListener('click', addTask);
inputTask.addEventListener('keydown', inputTaskListener);
