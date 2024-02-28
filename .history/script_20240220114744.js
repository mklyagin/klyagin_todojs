const buttonTaskAdd = document.querySelector('#add-task-button')
const inputTask = document.querySelector('#enter-task-input')

const addTaskButtonEventHandler = () => {
  // eslint-disable-next-line no-console
  console.log(inputTask.value);
};

buttonTaskAdd.addEventListener('click', addTaskButtonEventHandler);
