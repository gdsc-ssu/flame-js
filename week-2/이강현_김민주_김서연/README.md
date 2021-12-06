- 문제 보기들을 삭제하는 함수를 분리했었는데, 한줄로 구현이 가능한 로직이었고 `insertProblems` 함수 역할을 "문제와 보기 모두 변경"으로 통일하기 위해 삭제하는 함수를 포함시키고 `changeProblems`으로 함수명 변경하였습니다.

  ```js
  // 이전
  function deleteProblems() {
    // 보기 삭제
    document.querySelectorAll('#num' + nowPage).forEach((element) => {
      element.remove();
    });
  }

  function insertProblems(index) {
    const $title = document.getElementById('title');
    const $psList = document.getElementById('psList');
    $title.innerHTML = problemList[index].title; // 제목은 삭제 및 추가이지만
    // 보기 추가																		// 보기는 추가만 하는 로직이었음
  }
  ```

  ```js
  // 이후
  function changeProblems(index) {
    const $title = document.getElementById('title');
    const $psList = document.getElementById('psList');
    $title.innerHTML = problemList[index].title; // 제목 삭제 및 추가
    $psList.innerHTML = ''; // 보기 삭제
    // 보기 추가
  }
  ```

  id가 num인 요소(`li`)를 `forEach`문을 활용해 하나씩 지우는 방법에서 삭제될 요소들의 부모 요소(id가 psList인 요소(`ul`))의 내부에 빈 값을 할당해주어 해당 요소들을 삭제시켰습니다.

- 점수 집계 및 결과 반환 함수 score()를 역할에 따라 분리하였습니다. (점수를 반환하는 방식을 약간 바꿔봤습니다ㅎ)

  ```js
  // 이전
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
  ```

  ```js
  // 이후
  function returnResult(score, wrong) {
    // 결과 반환 함수
    const $title = document.getElementById('title');
    const $submit = document.querySelector('.submit');
    const $psList = document.getElementById('psList');

    $title.innerHTML = `${wrong}개 틀리셨네요, 점수는 ${Math.floor(
      (100 / problemList.length) * score
    )}점입니다`;
    $psList.innerHTML = '';
    $submit.innerText = 'Replay';
  }

  function score() {
    // 점수 채점 함수
    for (let i = 0; i < problemList.length; i++) {
      if (problemList[i].answer === scoreBoard[i]) {
        finalScore += 1;
      } else {
        wrongProblems += 1;
      }
    }

    returnResult(finalScore, wrongProblems);
  }
  ```

- 문제를 다 푼 후에, submit 버튼이 새로고침으로 바뀌게 만드는 로직의 오류를 해결하였습니다.

  기존에는 페이지 수가 문제 수보다 많아지면 새로고침이 되도록 구현하였지만, 답을 제출하지 않으면 페이지가 넘어가지 않도록 구현했기 때문에 정상적으로 동작하지 않았습니다. 페이지를 이용한 다른 방법이 생각나지 않아, 결과 반환을 하는 함수 내부에서 버튼을 Replay로 바꾸면서 클릭 시 새로고침 되는 이벤트도 추가해주었습니다.

  ```js
  // 이전
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
      location.reload(true); //새로고침 (window.location.reload(true)인데 오타인듯!)
    }
    insertProblems(nowPage);
  }
  ```

  ```js
  // 이후
  function nextProblems() {
    if (!saveAnswer(nowPage)) {
      // saveAnswer 반환 값을 기존 함수와 다르게 만들어서 바뀐거니 혼란스러워마세요ㅎ
      return;
    }

    nowPage += 1;
    changeProblems(nowPage);

    if (nowPage == problemList.length) {
      score();
    }
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
    $submit.addEventListener('click', () => window.location.reload(true)); // 클릭 시 새로고침 이벤트 추가
  }
  ```
