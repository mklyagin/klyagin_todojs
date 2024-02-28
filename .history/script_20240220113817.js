const buttonTaskAdd = document.querySelector('#add-task-button')
const inputTask = document.querySelector('#enter-task-input')

const addTaskButtonEventHandler = (event) => {
  if (event === "click") {
    console.log(inputTask.value)
  }
};

buttonTaskAdd.addEventListener(event,addTaskButtonEventHandler(event));