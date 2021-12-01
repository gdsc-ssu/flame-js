const problemList = [
  {
    title: '문제 1',
    list: ['1', '2', '3'],
    answer: 2,
  },
  {
    title: '문제 2',
    list: ['1', '2', '3'],
    answer: 2,
  },
  {
    title: '문제 3',
    list: ['1', '2', '3'],
    answer: 2,
  },
];
let scoreBoard = [1, 2, 3];
let nowPage = 0;
let finalScore = 0;

function nextProblems() {
  saveAnswer(nowPage);
  try {
    deleteProblems();
  } catch (error) {}
  nowPage += 1;
  if (nowPage >= problemList.length) {
    score();
  }
  insertProblems(nowPage);
}
function saveAnswer() {
  var obj_len = document.getElementsByName('checkValue').length;
  console.log(obj_len);
  for (var i = 0; i < obj_len; i++) {
    if (document.getElementsByName('checkValue')[i].checked == true) {
      scoreBoard[nowPage] = i;
    }
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
  title.innerHTML = '당신의 점수는' + finalScore + '점입니다';
}

function submitBtn() {
  nextProblems();
}
window.onload = function () {
  insertProblems(0);
};
