const $title = document.querySelector('#title');
const $months = document.querySelector('#months');
const $days = document.querySelector('#days');
const $hours = document.querySelector('#hours');
const $minutes = document.querySelector('#minutes');
const $seconds = document.querySelector('#seconds');

// 크리스마스 D-Day를 위한 변수
const CHRISTMAS_DATE = new Date('2021.12.25');
const CHRISTMAS_TITLE = 'Until Christmas';

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

$title.innerText = CHRISTMAS_TITLE;
setInterval(makeCounter(CHRISTMAS_DATE), 1000); // 1초마다 호출
