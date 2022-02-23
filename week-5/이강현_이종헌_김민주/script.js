const APIURL =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI =
  'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';

const $input = document.querySelector('.search-input');
const $form = document.querySelector('.search-form');
const $main = document.querySelector('main');

async function getPopularMovies() {
  const response = await fetch(APIURL);
  const data = await response.json();

  return data;
}

async function getSearchMovies(text) {
  const response = await fetch(SEARCHAPI + text);
  const data = await response.json();

  return data;
}

function makeCard(imgPath, title, rate, overview) {
  return `
  <div class="movie-card">
    <img class="movie-img" src="${imgPath}" alt="" />
    <div class="movie-info">
      <p class="info-title">${title}</p>
      <div class="rate-box">
        <p class="rate-box__number">${rate}</p>
      </div>
    </div>
    <div class="movie-overview">
      <p class="overview-title">Overview:</p>
      <span class="overview-content">${overview}</span>
    </div>
  </div>
  `;
}

function showMovies(dataList) {
  const $wrapper = document.createElement('div');
  $wrapper.className = 'movies-container';

  dataList.results.forEach((data) => {
    const imgPath = IMGPATH + data.poster_path;
    $wrapper.innerHTML += makeCard(
      imgPath,
      data.title,
      data.vote_average,
      data.overview
    );
  });
  $main.innerHTML = '';
  $main.appendChild($wrapper);
}

async function onLoad() {
  const dataList = await getPopularMovies();

  showMovies(dataList);
}

async function onSearch(e) {
  e.preventDefault();

  const text = $input.value;
  const dataList = await getSearchMovies(text);

  showMovies(dataList);
}

$form.addEventListener('submit', onSearch);

window.onload = onLoad;
