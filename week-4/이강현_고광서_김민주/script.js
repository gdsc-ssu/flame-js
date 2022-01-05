// localStorage를 위한 두 가지 func
const callDataFunc = (key) => {
  const savedData = localStorage.getItem(key);
  return JSON.parse(savedData);
};

const saveDataFunc = (key, value) => {
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
};

let likeList = callDataFunc('likeList') || [
  {
    id: '123',
    img: '',
    title: '',
  },
];

const getSearchData = async (text) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
  );

  const result = await res.json();
  return result;
};

const getRandomData = async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');

  const result = await res.json();
  return result;
};

const getInfo = async (id) => {
  const res = await fetch(`www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

  const result = await res.json();
  return result;
};

function likedToggle(data) {
  console.log('dd');
  likeList.push(data);
}

function renderCard(dataList, isRandom) {
  const main = document.querySelector('main');
  const card = (data) => `<section class="card">
  ${isRandom ? `<div class="card-label">Random Receipe</div>` : ''}
  <img src="${data.strMealThumb}" alt="" class="card-image" />
  <div class="card-info">
    <span class="card-title">${data.strMeal}</span>
    <button onclick="likedToggle(${data})" class="fav-button">
      <i class="like fa fa-heart"></i
      ><i class="unlike fa fa-heart-o"></i>
    </button>
  </div>
</section>`;

  let cards = '';
  dataList.forEach((data) => {
    cards += card(data);
  });
  main.innerHTML = cards;
}

async function onLoad() {
  const randomData = await getRandomData();
  renderCard(randomData.meals, true);
}

const $searchInput = document.querySelector('.search-input');
const $searchBtn = document.querySelector('.search-button');

const onSearch = async () => {
  const text = $searchInput.value;

  const searchResult = await getSearchData(text);

  renderCard(searchResult.meals, false);
};

$searchBtn.addEventListener('click', onSearch);

window.onload = onLoad; //
