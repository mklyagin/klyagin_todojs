
const buttonTaskAdd = document.querySelector('#AddTaskButton')

const onClickAddTaskButton = () => {
    const inputTask = document.querySelector('#InputTask')
    console.log(inputTask.value);
}

const onBlurAddTaskButton = () => {
    console.log('onBlur')
}