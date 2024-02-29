(() => {
  const ENTER_KEY = 'Enter';
  const ESCAPE_KEY = 'Escape';
  const QUANTITY_OF_TASKS = 5;
  const DOUBLE_CLICK = 2;

  const buttonTaskAdd = document.querySelector('#add-task-button');
  const inputTask = document.querySelector('#enter-task-input');
  const ulTasks = document.querySelector('#task-list');
  const checkAllCheckbox = document.querySelector('#check-all-checkbox');
  const deleteAllCompletedButton = document.querySelector('#delete-all-completed-button');
  const tabulationDiv = document.querySelector('#tabulation');
  const paginationDiv = document.querySelector('#pagination');

  let taskList = [];
  let taskListPages = [[]];
  let filterType = 'show-all';
  let currentPage = 1;

  //const strValidation = (inputStr) => inputStr.replace(/[!@#$%^&*()'"`<>;:]/g, '');

  const calcPagesNumber = (tasksArray) => {
    if (tasksArray.length === 0) {
      return 1;
    }
    return Math.ceil(tasksArray.length / QUANTITY_OF_TASKS);
  };

  const getTasksByFilterType = () => {
    console.log('get task by filtertype', taskList);
    if (filterType === 'show-active') {
      return taskList.filter((task) => !task.isDone);
    } if (filterType === 'show-completed') {
      return taskList.filter((task) => task.isDone);
    }
    return taskList;
  };

  const getSlicedTasks = () => {
    let list = getTasksByFilterType();
    const endIndex = currentPage * QUANTITY_OF_TASKS;
    const startIndex = endIndex - QUANTITY_OF_TASKS;
    console.log('sliced tasks', taskList);
    return list.splice(startIndex, endIndex);
  };

  const checkAllTaskStates = () => {
    checkAllCheckbox.checked = taskList.length
      ? (taskList.every((task) => task.isDone))
      : false;
  };

  const listToPages = (currentList) => {
    taskListPages = [[]];
    let index = 0;
    currentList.forEach((task) => {
      if (taskListPages[index].length === QUANTITY_OF_TASKS) {
        taskListPages.push([]);
        index += 1;
      }
      taskListPages[index].push(task);
    });
  };

  const taskValidation = () => {
    taskList.forEach((task) => {
      task.title = task.title.trim();
    });
    console.log('valid1', taskList);
    
    //taskList = taskList.filter((task) => task.title.length > 0);
    console.log('valid2', taskList);
  };
  const taskFilterCounter = () => {
    const counter = {
      total: taskList.length,
      active: (taskList.filter((task) => !task.isDone)).length,
      completed: (taskList.filter((task) => task.isDone)).length,
    };

    return counter;
  };

  const taskRender = () => {
    let listOfTasks = '';
    let prePaginationList = '';
    let currentList = [];
    taskValidation();
    //currentList = getTasksByFilterType();
    //console.log(getTasksByFilterType());
    console.log('start render', taskList);
    currentList = getSlicedTasks();
    //console.log(getSlicedTasks());

    //listToPages(currentList);
    console.log('from render', taskList);
    currentList.forEach((task) => {
      listOfTasks += `
        <li id=${task.id}>
          <input type="checkbox" class="check-task" ${task.isDone ? 'checked' : ''}>
          <span class="task-title">${task.title}</span>
          <input hidden maxlength="150" class="edit-task" id=${task.id} value=${task.title} >
          <button type="button" class="delete-task">X</button>
        </li>
      `;
    });
    ulTasks.innerHTML = listOfTasks;
    checkAllTaskStates();
    const tabNumbers = taskFilterCounter();
    for (let index = 0; index < 3; index += 1) {
      if (tabulationDiv.children[index].id === filterType) {
        tabulationDiv.children[index].classList.add('active');
      } else {
        tabulationDiv.children[index].classList.remove('active');
      }
    }
    tabulationDiv.children[0].innerHTML = `All (${tabNumbers.total})`;
    tabulationDiv.children[1].innerHTML = `Active (${tabNumbers.active})`;
    tabulationDiv.children[2].innerHTML = `Completed (${tabNumbers.completed})`;
    for (let i = 1; i <= Math.ceil(currentList.length / QUANTITY_OF_TASKS); i += 1) {
      prePaginationList += `<button class="page-number ${(i === currentPage ? 'active' : '')}">${i}</button>`;
    }
    paginationDiv.innerHTML = prePaginationList;
  };

  const setPage = (event) => {
    if (event.target.classList.contains('page-number')) {
      currentPage = Number(event.target.innerHTML);
    }
    taskRender();
  };

  const addTask = () => {
    console.log('aaaaa', taskList);
    const task = {
      id: Date.now(),
      title: inputTask.value,
      isDone: false,
    };
    console.log('before push add task', task);
    taskList.push(task);
    console.log('after push add task', taskList);
    inputTask.value = '';
    filterType = 'show-all';
    console.log('qq', taskList);
    taskRender();
  };

  const editVisibilityToggle = (target) => {
    target.hidden = !target.hidden;
    if (target.className === 'task-title') {
      target.nextElementSibling.hidden = !target.nextElementSibling.hidden;
      target.nextElementSibling.focus();
    } else {
      target.previousElementSibling.hidden = !target.previousElementSibling.hidden;
    }
  };

  const editMode = (event) => {
    if (event.target.className === 'edit-task') {
      if (event.key === ESCAPE_KEY) {
        taskRender();
      } else if (event.key === ENTER_KEY || (event.type === 'blur' && event.sourceCapabilities)) {
        event.target.value = event.target.value.trim();
        if (!event.target.value.length) {
          taskRender();
        } else {
          editVisibilityToggle(event.target.previousElementSibling);
          taskList.forEach((task) => {
            if (task.id === Number(event.target.id)) {
              task.title = strValidation(event.target.value);
            }
          });
          taskRender();
        }
      }
    }
  };

  const eventUlHandlerListener = (event) => {
    const eventTaskID = Number(event.target.parentNode.id);
    const elemClass = event.target.className;
    if (elemClass === 'check-task') {
      taskList.forEach((task) => {
        if (task.id === eventTaskID) {
          task.isDone = event.target.checked;
        }
        checkAllTaskStates();
      });
      taskRender();
    } else if (elemClass === 'delete-task') {
      taskList = taskList.filter((task) => task.id !== eventTaskID);
      taskRender(true);
    } else if (elemClass === 'task-title' && event.detail === DOUBLE_CLICK) {
      editVisibilityToggle(event.target);
    }
  };

  const inputTaskListener = (event) => {
    if (event.key === ENTER_KEY) {
      addTask();
    }
  };

  const deleteCompleted = () => {
    taskList = taskList.filter((task) => !task.isDone);
    taskRender();
  };

  const checkAll = () => {
    taskList.forEach((task) => {
      task.isDone = checkAllCheckbox.checked;
    });
    taskRender();
  };

  const tabulationListener = (event) => {
    currentPage = 1;
    filterType = event.target.id;
    taskRender();
  };

  ulTasks.addEventListener('click', eventUlHandlerListener);
  ulTasks.addEventListener('blur', editMode, true);
  ulTasks.addEventListener('keydown', editMode);
  buttonTaskAdd.addEventListener('click', addTask);
  inputTask.addEventListener('keydown', inputTaskListener);
  deleteAllCompletedButton.addEventListener('click', deleteCompleted);
  checkAllCheckbox.addEventListener('click', checkAll);
  tabulationDiv.addEventListener('click', tabulationListener);
  paginationDiv.addEventListener('click', setPage);
})();
