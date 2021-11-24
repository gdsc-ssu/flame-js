피드백 받은 부분에 대하여

1. 쿼리를 사용한이유😁

   : 선택자를 이용해서 Element를 받아올 수 있어 메리트가 있다고 생각했습니다. (물론 선택자를 크게 활용하진 않았지만요ㅎ)

2. 수식이 간결하지 못합니다 ㅎㅎ / 남은 시간을 계산하는 과정에서 24, 60 등 필요한 숫자를 네이밍 없이 계산 과정에서 바로(raw하게) 사용하다 보니 가독성이 떨어져 실수할 위험이 있을 것 같습니다.

   : 광서님이 단위를 변수로 만들어 코드를 간결하게 했던 부분이 인상깊어 저도 동일하게 만들어보았습니다.

   추가적으로 변수명도 보다 직관적이게 수정하였습니다.

   ```js
   // 단위 (millisec 기준)
   const monthUnit = 1000 * 60 * 60 * 24 * 30;
   const dayUnit = 1000 * 60 * 60 * 24;
   const hourUnit = 1000 * 60 * 60;
   const minuteUnit = 1000 * 60;
   const secondUnit = 1000;
   
   // D-Day 계산기
   const makeCounter = (targetDate) => () => {
     const now = Date.now();
     if (targetDate > now) {
       const diff = targetDate - now;
   
       const month = Math.floor(diff / monthUnit);
       const day = Math.floor((diff % monthUnit) / dayUnit);
       const hour = Math.floor((diff % dayUnit) / hourUnit);
       const minute = Math.floor((diff % hourUnit) / minuteUnit);
       const second = Math.floor((diff % minuteUnit) / secondUnit);
   
       $months.innerText = month;
       $days.innerText = day;
       $hours.innerText = hour;
       $minutes.innerText = minute;
       $seconds.innerText = second;
     }
   };
   ```

   

3. 시맨틱하지 못해요 / class 이름이 좀 더 직관적이었음 좋겠습니다!

   : 거의 div태그로만 구현하고 class, id 명이 직관적이지 못했던 이전 html 코드를 수정했습니다.(잘한건지 잘 모르겠네요.. 피드백 부탁드립니다!)

   

+확장성을 조금 고려해서 title(제목?)을 JS에서 동적으로 만들고, d-day를 계산하는 함수도 date 객체를 인자로 받아 남은 날짜를 동적으로 생성하도록 만들었습니다.

완성된 화면
![image](https://user-images.githubusercontent.com/70627979/143289791-7c43fd47-249f-445d-a2ec-e4bb4f5824a2.png)
