(() => {
  const ENTER_KEY = 'Enter';
  const ESCAPE_KEY = 'Escape';
  const QUANTITY_OF_TASKS = 5;

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
  let currentPage = 0;

  const strValidation = (inputStr) => inputStr.replace(/[!@#$%^&*()'"`<>;:]/g, '');

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

  const taskFilter = (currentList) => {
    switch (filterType) {
      case ('show-all'):
        return currentList;
      case ('show-active'):
        currentList = currentList.filter((task) => !task.isDone);
        return currentList;
      case ('show-completed'):
        currentList = currentList.filter((task) => task.isDone);
        return currentList;
      default:
        return undefined;
    }
  };

  const taskValidation = () => {
    taskList.forEach((task) => {
      task.title = task.title.trim();
    });
    taskList = taskList.filter((task) => task.title.length);
  };
  const taskFilterCounter = () => {
    const counter = {
      total: taskList.length,
      active: (taskList.filter((task) => !task.isDone)).length,
      completed: (taskList.filter((task) => task.isDone)).length,
    };

    return counter;
  };

  const taskRender = (isAdding) => {
    let listOfTasks = '';
    let prePaginationList = '';
    let currentList = [];
    taskValidation();
    currentList = taskFilter(taskList);
    listToPages(currentList);
    if (isAdding) {
      currentPage = taskListPages.length - 1;
    }
    taskListPages[currentPage].forEach((task) => {
      listOfTasks
    += `<li id=${task.id}>
    <input type="checkbox" class="check-task" ${task.isDone ? 'checked' : ''}>
    <span class="task-title">${task.title}</span>
    <input hidden maxlength="150" class="edit-task" id=${task.id} value=${task.title} >
    <button type="button" class="delete-task">X</button>
    </li>`;
    });
    ulTasks.innerHTML = listOfTasks;
    checkAllTaskStates();
    const tabNumbers = taskFilterCounter();
    for (let index = 0; index < 3; index += 1) {
      // console.log(tabulationDiv.children[index].id);
      if (tabulationDiv.children[index].id === filterType) {
        tabulationDiv.children[index].classList.add('active');
      } else {
        tabulationDiv.children[index].classList.remove('active');
      }
    }
    tabulationDiv.children[0].innerHTML = `All (${tabNumbers.total})`;
    tabulationDiv.children[1].innerHTML = `Active (${tabNumbers.active})`;
    tabulationDiv.children[2].innerHTML = `Completed (${tabNumbers.completed})`;
    for (let i = 0; i < taskListPages.length; i += 1) {
      prePaginationList += `<button class="page-number ${(i === currentPage ? 'active' : '')}">${i + 1}</button>`;
    }
    paginationDiv.innerHTML = prePaginationList;
  };

  const setPage = (event) => {
    if (event.target.classList.contains('page-number')) {
      currentPage = event.target.innerHTML - 1;
    }
    taskRender();
  };

  const addTask = () => {
    const task = {
      id: Date.now(),
      title: strValidation(inputTask.value),
      isDone: false,
    };

    taskList.push(task);
    inputTask.value = '';
    filterType = 'show-all';
    taskRender(true);
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
    } else if (elemClass === 'delete-task' && event.type === 'click') {
      taskList = taskList.filter((task) => task.id !== eventTaskID);
      taskRender(true);
    } else if (elemClass === 'task-title' && event.detail === 2) {
      editVisibilityToggle(event.target);
    }
  };

  const inputTaskListener = (event) => {
    if (event.key === ENTER_KEY) {
      addTask();
      inputTask.blur();
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

  const paginationCounter = (totalNumber) => {
    if (totalNumber <= 0) {
      return 0;
    }
    return (Math.ceil(totalNumber / 5) - 1);
  };

  const tabulationListener = (event) => {
    const tabNumbers = taskFilterCounter();
    const { id } = event.target;
    switch (id) {
      case ('show-all'):
        filterType = id;
        currentPage = paginationCounter(tabNumbers.total);
        taskRender();
        break;
      case ('show-active'):
        filterType = id;
        currentPage = paginationCounter(tabNumbers.active);
        taskRender();
        break;
      case ('show-completed'):
        filterType = id;
        currentPage = paginationCounter(tabNumbers.completed);
        taskRender();
        break;
      default:
        break;
    }
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