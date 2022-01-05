const $month = document.querySelector('#month');
const $day = document.querySelector('#day');
const $hour = document.querySelector('#hour');
const $minute = document.querySelector('#minute');
const $second = document.querySelector('#second');

const CHRISTMAS = new Date('2021.12.25');

const timer = () => {
  const now = Date.now();
  const diff = CHRISTMAS - now;

  const month = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const day = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );
  const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((diff % (1000 * 60)) / 1000);

  $month.innerText = month;
  $day.innerText = day;
  $hour.innerText = hour;
  $minute.innerText = minute;
  $second.innerText = second;
};

setInterval(timer, 1000);
