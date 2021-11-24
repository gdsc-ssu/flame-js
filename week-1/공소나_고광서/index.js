function christmasCountdown() {
  let christmas = new Date("2021-12-25");

  let currentTime = new Date();

  let calc_second = 1000;
  let calc_minute = calc_second * 60;
  let calc_hour = calc_minute * 60;
  let calc_day = calc_hour * 24;
  let calc_month = calc_day * 30;

  let diff = christmas - currentTime;

  if(diff > 0){
    let last_months = Math.floor(diff/calc_month);
    let last_days = Math.floor((diff%calc_month)/calc_day);
    let last_hours = Math.floor((diff%calc_day)/calc_hour);
    let last_minutes = Math.floor((diff%calc_hour)/calc_minute);
    let last_seconds = Math.floor((diff%calc_minute)/calc_second);

    document.querySelector("#months > .num").innerText = last_months;
    document.querySelector("#days > .num").innerText = last_days;
    document.querySelector("#hours > .num").innerText = last_hours;
    document.querySelector("#minutes > .num").innerText = last_minutes;
    document.querySelector("#seconds > .num").innerText = last_seconds;
  }

  setTimeout(christmasCountdown, 1000);
}
 
function createSnow() {
   const snow = document.createElement('i');
   snow.classList.add('fas');
   snow.classList.add('fa-snowflake');
   snow.style.left = Math.random() * window.innerWidth + 'px';
   snow.style.animationDirection = Math.random() * 3 + 2 + 's';
   snow.style.opacity = Math.random();
   snow.style.fontSize = Math.random() * 10 + 10 + 'px';
 
   document.body.appendChild(snow);
 
   setTimeout(() => {
      snow.remove();
   }, 5000);
}

christmasCountdown();
setInterval(createSnow, 100);