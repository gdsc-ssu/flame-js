// localStorage를 위한 두 가지 func

const callLocalData = (key) => {
  const savedData = localStorage.getItem(key);
  return JSON.parse(savedData);
};

const saveLocalData = (key, value) => {
  const toJson = JSON.stringify(value);
  localStorage.setItem(key, toJson);
};

// 상태값
let favList = callLocalData('favList') || [];

// meal API
// 검색 결과 반환
const getSearchData = async (text) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
  );

  const results = await res.json();
  return results;
};

// 랜덤 결과 반환
const getRandomData = async () => {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const results = await res.json();
  return results;
};

// id값으로 결과 반환
const getInfoById = async (id) => {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const results = await res.json();
  return results;
};

// 카드 만들기
const makeCard = (isRandom, mealName, mealId, mealImgURL) => {
  const $cardArticle = document.createElement('article');
  $cardArticle.classList.add('card');
  $cardArticle.id = mealId;

  const cardInfo = `
    ${isRandom ? `<div class="card-label">Random Recipe</div>` : ''}
    <img src="${mealImgURL}" alt="" class="card-image" />
    <div class="card-info">
      <span class="card-title">${mealName}</span>
      <button class="fav-button">
        <i class="like fa fa-heart"></i>
        <i class="unlike fa fa-heart-o"></i>
      </button>
    </div>
  `;

  $cardArticle.innerHTML = cardInfo;

  // 레시피 자세히 보기, 좋/좋취 이벤트 처리
  $cardArticle.querySelector('img').addEventListener('click', () => {
    handleMoreInfo(mealId);
  });

  $cardArticle.querySelector('.fav-button').addEventListener('click', (e) => {
    toggleFavItem(mealId, e.currentTarget);
  });

  return $cardArticle;
};

// 카드 리스트 렌더링
const renderCardList = (mealList, isRandom) => {
  const $main = document.querySelector('main');
  $main.innerHTML = '';

  const $cardsContainer = document.createElement('section');
  $cardsContainer.className = 'cards-container';

  if (mealList) {
    mealList?.forEach(({ strMeal, idMeal, strMealThumb }) => {
      $cardsContainer.appendChild(
        makeCard(isRandom, strMeal, idMeal, strMealThumb)
      );
    });
  } else {
    $cardsContainer.textContent = '검색 결과가 존재하지 않습니다.';
  }

  $main.appendChild($cardsContainer);
};

// 좋아요 요소 만들기
const makeFavItem = (mealName, mealId, mealImgURL) => {
  const $listItem = document.createElement('li');
  $listItem.className = 'fav-item';
  $listItem.id = mealId;

  const favInfo = `
    <div class="item-del">X</div>
    <img src="${mealImgURL}" alt="" class="item-img" />
    <span class="item-name">${mealName}</span>
  `;

  $listItem.innerHTML = favInfo;

  // 레시피 자세히 보기, 좋/좋취 이벤트 처리
  $listItem.addEventListener('click', (e) => {
    if (e.target.classList.contains('item-del')) {
      toggleFavItem(mealId);
    } else {
      handleMoreInfo(mealId);
    }
  });

  return $listItem;
};

// 좋아요 목록 렌더링
const renderfavList = (favList) => {
  const $favWrapper = document.querySelector('.favorite-wrapper');
  $favWrapper.innerHTML = '';

  const $favUL = document.createElement('ul');
  $favUL.className = 'favorite-list';

  favList.forEach(({ mealName, mealId, mealImgURL }) => {
    $favUL.appendChild(makeFavItem(mealName, mealId, mealImgURL));
  });

  $favWrapper.appendChild($favUL);
};

// 좋아요/좋취
const toggleFavItem = async (targetId, $button) => {
  const foundIdx = favList.findIndex((favItem) => favItem.mealId == targetId);

  if (foundIdx === -1) {
    const selectedData = await getInfoById(targetId);
    const mealInfo = {
      mealId: selectedData.meals[0].idMeal,
      mealName: selectedData.meals[0].strMeal,
      mealImgURL: selectedData.meals[0].strMealThumb,
    };
    favList.push(mealInfo);

    $button?.classList.add('liked');
  } else {
    favList.splice(foundIdx, 1);
    $button?.classList.remove('liked');
  }

  saveLocalData('favList', favList);

  renderfavList(favList);
};

// 자세히 보기
const handleMoreInfo = async (targetId) => {
  const selectedData = await getInfoById(targetId);
  const mealInfo = {
    mealName: selectedData.meals[0].strMeal,
    mealImgURL: selectedData.meals[0].strMealThumb,
    mealRecipe: selectedData.meals[0].strInstructions,
  };

  const $modalWrapper = document.querySelector('.modal-wrapper');
  $modalWrapper.innerHTML = '';
  $modalWrapper.classList.remove('hidden');

  // 내부
  const $modalContents = document.createElement('section');
  $modalContents.className = 'modal-wrapper__contents';

  const content = `
    <div class="modal-close">X</div>
    <h1 class="modal-name">${mealInfo.mealName}</h1>
    <img src="${mealInfo.mealImgURL}" alt="" class="modal-img">
    <p class="modal-recipe">${mealInfo.mealRecipe}</p>
  `;

  $modalContents.innerHTML = content;

  // 외부
  const $modalOverlay = document.createElement('div');
  $modalOverlay.className = 'modal-wrapper__overlay';

  const closeModal = () => {
    $modalWrapper.classList.toggle('hidden');
    $modalWrapper.innerHTML = '';
  };

  $modalOverlay.addEventListener('click', closeModal);
  $modalContents
    .querySelector('.modal-close')
    .addEventListener('click', closeModal);

  $modalWrapper.append($modalContents, $modalOverlay);
};

// 초기 로딩(새로고침)
const onLoad = async () => {
  renderfavList(favList); // 좋아요 목록

  const randomData = await getRandomData(); // 랜덤 결과
  renderCardList(randomData.meals, true);
};

window.onload = onLoad;

// 검색
const $searchInput = document.querySelector('.search-input');
const $searchBtn = document.querySelector('.search-button');

const onSearch = async () => {

  const searchText = $searchInput.value;
  const searchResult = await getSearchData(searchText);

  renderCardList(searchResult.meals, false);
};

$searchBtn.addEventListener('click', onSearch);
