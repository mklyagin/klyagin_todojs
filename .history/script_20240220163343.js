const buttonTaskAdd = document.querySelector('#add-task-button');
const inputTask = document.querySelector('#enter-task-input');
const ulTask = document.querySelector('#task-list');
let deleteButtonsList = [];

const ENTER_KEY = 'Enter';

const taskList = [];

const deleteTask = () => {

};



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
  taskRender();
};

const eventUlHandlerListener = (event) => {
  switch (event) {
    case (event.target.type === 'checkbox'):
      console.log(event.target);

      break;
    case (event.target.type === 'button'):
      console.log(event.target);
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
