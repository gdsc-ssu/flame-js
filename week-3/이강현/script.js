const $memoAddBtn = document.querySelector('.memo-add');
const $memoWrapper = document.querySelector('.main');

// localStorage를 위한 두 가지 func
const callDataFunc = (key) => {
  const savedData = localStorage.getItem(key);
  return JSON.parse(savedData);
};

const saveDataFunc = (key, value) => {
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
};

// id, value(내용)를 저장하는 배열
const memosArr = callDataFunc('memos') || [];

// 새로운 메모 추가
let SAFE_ID_NUM = 0;

const addNewMemoFunc = () => {
  SAFE_ID_NUM += 1;
  const newId = `${Date.now()}` + `${SAFE_ID_NUM}`; // 고유한 Id 만들기

  memosArr.unshift({ memoId: newId, memoValue: '', isSaved: false });

  saveDataFunc('memos', memosArr);

  render(memosArr);
};

// 메모 편집
const editMemoFunc = (e) => {
  const $targetElement = e.target.parentNode.parentNode;
  const memoId = $targetElement.id;
  const memoValue = $targetElement.querySelector(
    '.memo-content__textarea'
  ).value;

  const found = memosArr.findIndex((memo) => memo.memoId === memoId);

  if (found !== -1) {
    if (!memosArr[found].isSaved) {
      memosArr[found].memoValue = memoValue; // 수정
    }

    memosArr[found].isSaved = !memosArr[found].isSaved;
  }

  saveDataFunc('memos', memosArr);

  render(memosArr);
};

// 메모 삭제
const deleteMemoFunc = (e) => {
  const targetElement = e.target.parentNode.parentNode;
  const memoId = targetElement.id;

  const found = memosArr.findIndex((memo) => memo.memoId === memoId);

  if (found !== -1) {
    memosArr.splice(found, 1);
  }

  saveDataFunc('memos', memosArr);

  render(memosArr);
};

// 메모장 구현
const makeMemoFunc = (id, value, isSaved) => {
  const $memoWrapper = document.createElement('li');
  $memoWrapper.className = 'memo-wrapper';
  $memoWrapper.id = `${id}`;

  const $memoHeader = document.createElement('div');
  $memoHeader.className = 'memo-header';

  const $memoHeaderEdit = document.createElement('button');
  $memoHeaderEdit.className = 'memo-header__edit';
  $memoHeaderEdit.textContent = isSaved ? 'edit' : 'save';
  $memoHeaderEdit.addEventListener('click', editMemoFunc);

  const $memoHeaderDelete = document.createElement('button');
  $memoHeaderDelete.className = 'memo-header__delete';
  $memoHeaderDelete.textContent = 'X';
  $memoHeaderDelete.addEventListener('click', deleteMemoFunc);

  $memoHeader.appendChild($memoHeaderEdit);
  $memoHeader.appendChild($memoHeaderDelete);

  const $memoContent = document.createElement('div');
  $memoContent.className = 'memo-content';

  const $memoContentTextarea = document.createElement('textarea');
  $memoContentTextarea.className = 'memo-content__textarea';
  $memoContentTextarea.textContent = value;

  const $memoContentMarkdown = document.createElement('div');
  $memoContentMarkdown.className = 'memo-content__markdown';
  console.log(value);
  $memoContentMarkdown.innerHTML = marked(value); // markdown
  if (!isSaved) {
    $memoContentMarkdown.classList.add('hidden');
  }

  $memoContent.appendChild($memoContentTextarea);
  $memoContent.appendChild($memoContentMarkdown);

  $memoWrapper.appendChild($memoHeader);
  $memoWrapper.appendChild($memoContent);

  return $memoWrapper;
};

// 화면 그리기
const render = (arr) => {
  if (!arr) {
    return;
  }

  $memoWrapper.innerHTML = '';

  if (arr.length === 0) {
    const $empty = document.createElement('div');
    $empty.className = 'empty';
    $empty.textContent = '텅';

    $memoWrapper.appendChild($empty);
  }

  if (arr.length > 0) {
    const $memoList = document.createElement('ul');
    $memoList.className = 'memo-list';

    arr.forEach((item) => {
      const $element = makeMemoFunc(item.memoId, item.memoValue, item.isSaved);
      $memoList.appendChild($element);
    });

    $memoWrapper.appendChild($memoList);
  }
};

render(memosArr); // 처음 화면(새로고침 시)

$memoAddBtn.addEventListener('click', addNewMemoFunc);
