const buttonTaskAdd = document.querySelector('#add-task-button')
const inputTask = document.querySelector('#enter-task-input')

const ENTER_KEY = 'Enter';

const showTaskInputValue = () => {
  // eslint-disable-next-line no-console
  console.log(inputTask.value);
};

const inputTaskListener = (event) => {
  if (event.key === ENTER_KEY) {
    showTaskInputValue();
    inputTask.blur();
  }
};

buttonTaskAdd.addEventListener('click', showTaskInputValue);
inputTask.addEventListener('keydown', inputTaskListener);
