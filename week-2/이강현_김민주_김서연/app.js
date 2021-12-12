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
let wrongProblems = 0;

function nextProblems() {
  if (!saveAnswer(nowPage)) {
    return;
  }

  nowPage += 1;
  changeProblems(nowPage);

  if (nowPage == problemList.length) {
    score();
  }
}

// 답을 기록하는 함수
function saveAnswer(nowPage) {
  const $inputRadioTags = document.getElementsByName('checkValue');
  const obj_len = $inputRadioTags.length;
  let flag = false;

  for (let i = 0; i < obj_len; i++) {
    if ($inputRadioTags[i].checked === true) {
      scoreBoard[nowPage] = i;
      flag = true;
    }
  }

  return flag;
}

// 문제 및 보기 변경 함수
function changeProblems(index) {
  if (!problemList[index]) {
    return;
  }

  const $title = document.getElementById('title');
  const $psList = document.getElementById('psList');

  $title.innerHTML = problemList[index].title; // 제목 변경
  $psList.innerHTML = ''; // 보기 변경
  problemList[nowPage].list.forEach((element) => {
    $psList.innerHTML += `<li id=num${nowPage}>
        <input type="radio" name="checkValue" class="problem-value problem1"/><label for="problem">
      ${element}
      </label></li>
      `;
  });
}

// 결과 반환 함수
function returnResult(score, wrong) {
  const $title = document.getElementById('title');
  const $submit = document.querySelector('.submit');
  const $psList = document.getElementById('psList');

  $title.innerHTML = `${wrong}개 틀리셨네요, 점수는 ${Math.floor(
    (100 / problemList.length) * score
  )}점입니다`;
  $psList.innerHTML = '';
  $submit.innerText = 'Replay';
  $submit.addEventListener('click', () => window.location.reload(true));
}

// 점수 채점 함수
function score() {
  for (let i = 0; i < problemList.length; i++) {
    if (problemList[i].answer === scoreBoard[i]) {
      finalScore += 1;
    } else {
      wrongProblems += 1;
    }
  }

  returnResult(finalScore, wrongProblems);
}

function submitBtn() {
  nextProblems();
}

window.onload = function () {
  changeProblems(0);
};
