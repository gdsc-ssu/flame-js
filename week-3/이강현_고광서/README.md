변경된 기능: 성공 여부가 저장됨.
변경 사항

- `text`만 localStorage에 저장 -> `text`, `finished`, `id` 저장
- `addTodo()`에서 `id`, `finished` 생성 로직 추가
- `checked` 클래스를 없애고 `finished` 클래스만 가지고 성공 여부 컨트롤

- 나중에 삭제 기능 추가 필요해보임 (일단 영상에는 체크 여부만 나와있길래..ㅎ 뭐 더 만들어도 문제없지만 그냥!)

- `li`요소에 걸려있는 이벤트가 기존에는 ‘check-todo’ 클래스를 포함한 하위 요소에서만 이벤트 발생하게 했었는데, 해당 부분 삭제
- 버튼 뿐만이 아니라 `li`요소 클릭했을 때 toggle 되는게 사용자가 사용하기에 보다 편리해보임

- 아니라면 미안..ㅎ

- 따라서 콜백 함수 `checkTodo()` 내의 `e.target`에서 `e.currentTarget`으로 변경하여 `li`요소에 `finished` 클래스를 toggle 시킴

- `check` 여부에 따른 색상 변경은 CSS에서 `.finished > .check-todo` 선택자로 컨트롤하여 기존 기능 그대로
