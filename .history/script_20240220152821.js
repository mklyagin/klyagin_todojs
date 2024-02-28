const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');

const ENTER_KEY = 'Enter';

const taskList = [];

const deleteTask = (id) => {
  const deleteButtonsList = document.getElementsByClassName('deleteButton');
  deleteButtonsList.forEach((button) => {
    button.addEventListener('click', deleteTask);
  });
  let i = 0;
  taskList.forEach((task) => {
    console.log(task.id, '    ', id);
    if (task.id === id) {
      taskList.splice(i, 1);
    }
    i += 1;
  });
};

const taskRender = () => {
  let listOfTasks = '';
  taskList.forEach((task) => {
    listOfTasks
    += `<li name=${task.id}>
    <input type='checkbox'></input>
    <span>${task.title}</span>
    <button type='button' name=${task.id} id=#delete-${task.id} class='deleteButton'>X</button>
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
