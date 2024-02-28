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
  let i = 0;
  switch (event.target.type) {
    case 'checkbox':
      console.log(event.target.type);

      break;
    case ('button'):
      taskList.forEach((task) => {
        if (task.id === event.target.parentNode.id) {
          taskList.splice(i, 1);
        }
        i += 1;
      });

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
