const API_KEY = '5efa613e61cba4d2877695f85784e686';

const url = (city) => {
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
};

const renderWeather = (city, temp, weather) => {
  const $city = document.querySelector('.city');
  const $temp = document.querySelector('.temp');
  const $weather = document.querySelector('.weather');

  $city.innerText = city;
  $temp.innerText = temp;
  $weather.innerText = weather;
};

const getWeather = async (e) => {
  e.preventDefault();

  try {
    const $input = document.querySelector('.search-form__input');
    const targetCity = $input.value;

    $input.value = '';

    const response = await fetch(url(targetCity), { origin: 'cors' });
    const data = await response.json();

    const temp = data.main.temp.toFixed(1) + '°C';
    const weather = data.weather[0].description;
    const city = data.name;

    renderWeather(city, temp, weather);
  } catch (error) {
    console.log(error);
  }
};

const $form = document.querySelector('.search-form');

$form.addEventListener('submit', getWeather);
