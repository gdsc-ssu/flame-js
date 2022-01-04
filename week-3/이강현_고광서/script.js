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
const makeTodo = (text, finished, id) => {
  const $item = document.createElement('li');
  $item.className = 'todo-list__item';
  $item.id = `${id}`;

  if (finished) $item.classList.add('finished');

  $item.innerHTML = `
  <div class="check-todo"></div>
  <span class="todo-text">${text}</span>
  `;

  $item.addEventListener('click', checkTodo);

  return $item;
};

// todo list 그리기
const drawTodoList = (todosArr, isFirst) => {
  let $todoList;
  if (isFirst) {
    $todoList = document.createElement('ul');
    $todoList.className = 'todo-list';
  } else {
    $todoList = document.querySelector('.todo-list');
  }

  // console.log(isFirst, $todoList);

  todosArr.forEach(({ text, finished, id }) => {
    const $li = makeTodo(text, finished, id);
    $todoList.appendChild($li);
  });

  if (isFirst) {
    let $previousTodoList = document.querySelector('.todo-list');
    // console.log($previousTodoList);
    $main.replaceChild($todoList, $previousTodoList);
  }
};

// todo 추가
let SAFE_ID_NUM = 0;
const addTodo = (e) => {
  if (e.key !== 'Enter' || e.target.value === '') {
    return;
  }

  SAFE_ID_NUM += 1;
  const newId = `${Date.now()}` + `${SAFE_ID_NUM}`; // 고유한 Id 만들기

  const newItem = { text: e.target.value, finished: false, id: newId };

  todoList.push(newItem);
  saveData('todos', todoList);

  drawTodoList([newItem], false);

  $todoInput.value = '';
};

// 리스트 확인
const checkTodo = (e) => {
  e.currentTarget.classList.toggle('finished');

  const targetId = e.currentTarget.id;

  todoList.forEach((todo) => {
    if (todo.id === targetId) {
      todo.finished = true;
    }
  });

  saveData('todos', todoList);
};

drawTodoList(todoList, true); // 처음에 그리기

$todoInput.addEventListener('keyup', addTodo);
