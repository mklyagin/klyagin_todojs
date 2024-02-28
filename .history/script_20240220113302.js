const buttonTaskAdd = document.querySelector('#add-task-button')
const inputTask = document.querySelector('#enter-task-input')

const addTaskButtonEventHandler(event) => {
    if (event.type == "click") {
        console.log(inputTask.value)
    }
}

buttonTaskAdd.addEventListener('click',addTaskButtonEventHandler(event));