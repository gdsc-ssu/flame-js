const christmas = '25 dec 2021';

function countdown() {
   const christmasDate = new Date(christmas);
   const currentDate = new Date();

   const totalSeconds = (christmasDate - currentDate) / 1000;
   
   const days = Math.floor(totalSeconds / 3600 / 24);
   const months = Math.floor(days/30-1);
   const days_ = Math.floor(days%30); // 달 계산 
   const hours = Math.floor(totalSeconds / 3600) % 24;
   const minutes = Math.floor(totalSeconds / 60) % 60;
   const seconds = Math.floor(totalSeconds) % 60;

   document.getElementById('timer-months').innerText = formatTime(months)+'달';
   document.getElementById('timer-days').innerText = formatTime(days)+'일';
   document.getElementById('timer-hours').innerText = formatTime(hours)+'시';
   document.getElementById('timer-minutes').innerText = formatTime(minutes)+'분';
   document.getElementById('timer-seconds').innerText = formatTime(seconds)+'초';
}

function formatTime(time) {
   return time < 10 ? '0' + time : time;
}

setInterval(countdown, 1000);
