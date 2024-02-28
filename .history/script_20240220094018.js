const inputTaskData = document.querySelector('#InputTask')
const buttonTaskAdd = document.querySelector('#AddTaskButton')

buttonTaskAdd.addEventListener('click', (event) => {
    console.log(inputTaskData.value)
})