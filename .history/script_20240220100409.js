const inputTaskData = document.querySelector('#InputTask')
const buttonTaskAdd = document.querySelector('#AddTaskButton')

buttonTaskAdd.addEventListener('click', () => {
    console.log(inputTaskData.value)
})