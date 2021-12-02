const problemList = [
  {
    title: '세상에서 제일 멋진 사람은?',
    list: ['고광서', '김민주', '이종헌'],
    answer: 1,
  },
  {
    title: '세상에서 제일 똑똑한 사람은?',
    list: ['김서연', '공소나', '고광서'],
    answer: 0,
  },
  {
    title: '세상에서 제일 개쩌는 사람은?',
    list: ['공소나', '이종헌', '이강현'],
    answer: 2,
  },
];
let scoreBoard = [];
let nowPage = 0;
let finalScore = 0;

function nextProblems() {
  if (saveAnswer(nowPage)) {
    return;
  }
  try {
    deleteProblems();
  } catch (error) {}
  nowPage += 1;
  if (nowPage == problemList.length) {
    score();
  } else if (nowPage > problemList.length) {
    location.reload(true);
  }
  insertProblems(nowPage);
}
function saveAnswer() {
  const obj_len = document.getElementsByName('checkValue').length;
  let flag = false;
  for (var i = 0; i < obj_len; i++) {
    if (document.getElementsByName('checkValue')[i].checked == true) {
      scoreBoard[nowPage] = i;
      flag = true;
    }
  }
  if (!flag) {
    return true;
  }
}
function deleteProblems() {
  document.querySelectorAll('#num' + nowPage).forEach((element) => {
    element.remove();
  });
}
function insertProblems(index) {
  const title = document.getElementById('title');
  const psList = document.getElementById('psList');
  title.innerHTML = problemList[index].title;

  problemList[nowPage].list.forEach((element) => {
    psList.innerHTML +=
      ' <li id=num' +
      nowPage +
      '><input type="radio" name="checkValue" class="problem-value problem1"/><label for="problem">' +
      element +
      '</label></li>';
  });
}
function score() {
  for (let i = 0; i < problemList.length; i++) {
    if (problemList[i].answer === scoreBoard[i]) {
      finalScore += 1;
    } else {
    }
  }
  const title = document.getElementById('title');
  document.querySelector('.submit').innerText = 'Replay';
  title.innerHTML = '당신의 점수는 ' + finalScore + '점입니다';
}

function submitBtn() {
  nextProblems();
}
window.onload = function () {
  insertProblems(0);
};
