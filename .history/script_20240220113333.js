const buttonTaskAdd = document.querySelector('#add-task-button')
const inputTask = document.querySelector('#enter-task-input')

const addTaskButtonEventHandler() => {
    console.log(inputTask.value)
}

buttonTaskAdd.addEventListener('click',addTaskButtonEventHandler());