const $todoInput = document.querySelector('.todo-input');
const $main = document.querySelector('.main');

const callData = (key) => {
  const savedData = localStorage.getItem(key);
  return JSON.parse(savedData);
};

const saveData = (key, value) => {
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
};

const todoList = callData('todos') || [];

// li 요소 만들기
const makeTodo = (text) => {
  const $item = document.createElement('li');
  $item.className = 'todo-list__item';
  $item.innerHTML = `
  <div class="check-todo"></div>
  <span class="todo-text">${text}</span>
  `;
  $item.addEventListener('click', checkTodo);

  return $item;
};

// todo list 그리기
const drawTodoList = (arr, isFirst) => {
  let $todoList;
  if (isFirst) {
    $todoList = document.createElement('ul');
    $todoList.className = 'todo-list';
  } else {
    $todoList = document.querySelector('.todo-list');
  }

  console.log(isFirst, $todoList);

  arr.forEach((itemText) => {
    const $li = makeTodo(itemText);
    $todoList.appendChild($li);
  });

  if (isFirst) {
    let $previousTodoList = document.querySelector('.todo-list');
    console.log($previousTodoList);
    $main.replaceChild($todoList, $previousTodoList);
  }
};

// todo 추가
const addTodo = (e) => {
  if (e.key !== 'Enter' || e.target.value === '') {
    return;
  }

  todoList.push(e.target.value);
  saveData('todos', todoList);

  drawTodoList([e.target.value], false);
  $todoInput.value = '';
};

const checkTodo = (e) => {
  if (!e.target.classList.contains('check-todo')) {
    return;
  }

  e.target.classList.toggle('checked');
  e.target.nextElementSibling.classList.toggle('finished');
};

drawTodoList(todoList, true); // 처음에 그리기

$todoInput.addEventListener('keyup', addTodo);
