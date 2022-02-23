기능

- [x] 결과
  - [x] 검색 (여러개)
  - [x] 랜덤 (1개)
- [x] 좋아요 목록 (local storage)
- [x] 좋아요 / 좋아요 취소
- [x] 모달창 (자세히 보기 on 좋아요 목록, 카드 목록)



API

- [음식 API](https://www.themealdb.com/api.php)
  - 검색 : www.themealdb.com/api/json/v1/1/search.php?s=[sentence]
  - 랜덤: www.themealdb.com/api/json/v1/1/random.php
  - 선택: www.themealdb.com/api/json/v1/1/lookup.php?i=[id]

- Local Storage



- idMeal, strMeal, strInstructions, strMealThumb



문제점

- [x] 새로고침할때마다 박스가 줄었다가 늘어남
- [x] 검색햇을 때 화면이 이상하게 뜸
- [x] 검색 결과 존재하지 않는 경우 오류 발생
- [x] 카드리스트가 비동기로 생성되기 때문에 전역에서 documetn.querySelector로 card를 선택하면 뜨지 않음!
- [ ] onclick은 왜 동작 안하뉘!



추가

- favorite meals에서 글씨 넘치면 ... 로 처리되는거 추가
- 모달창 생성
- 좋아요/좋취 기능 생성
- LocalStorage 기능으로 좋아요 목록 관리



해결

- onClick 문제를 해결 못해서 createElement로 생성하고 이벤트 추가시킴
- 검색 결과 여러개 나올 때 화면 깨지던거를 height 지정하고 overflow-y: scroll로 해결
- 검색 결과 없을 때 발생하던 오류 해결 (+없을 때 처리)
- 그 외 함수 분리, like->favorite으로 모두 변경 등 개선



문제 및 추가 개선 가능성

- 빠르게 좋아요 두 번 누르면 두 개 추가된다..ㅋㅋ 저번에 민주가 만들었던 디바운싱을 이용하면 될 것 같다
- 좋아요 눌렀을 때 이미 DOM에 존재하는 요소들(사진, 이름, id) 그대로 가져오기 때문에 api를 이용하는 방식보다, DOM에 있는 값을 가져오면 속도가 개선될 것 같다.