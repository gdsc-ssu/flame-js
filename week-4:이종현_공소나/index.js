const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

const favMeals = document.querySelector('.fav-meals');

const mealContainer = document.querySelector('.meal-container');

const popupContainer = document.querySelector('.popup-container');
const popupContent = document.querySelector('.popup-content');

searchBtn.addEventListener('click',showSearch);
mealContainer.addEventListener('click', showPopup);

//검색 데이터 처리 get
async function getSearchMeal(text) {
    const resp = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
    const data = await resp.json();
    return data.meals;
}
//랜덤 데이터 get
async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const data = await resp.json();
    return data.meals[0];
}

//랜덤 결과 보여주기
async function showRandom(){
    const randRes = await getRandomMeal();
    drawMealInfo(randRes,true);
}
//검색 결과 보여주기
async function showSearch(){
    const text = searchInput.value;
    const searchRes = await getSearchMeal(text);
    mealContainer.innerHTML='';
    searchRes.map(res=> drawMealInfo(res,false));
}

//Meal 카드 그리기 
function drawMealInfo(meal,isRandom) {
    const content = document.createElement('div');
    content.innerHTML = `
        ${isRandom ? `<div class="rand-label">Random Recipe</div>` : ''}
        <div class="meal-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        </div>
        <div class="meal-info">
            <div class="meal-name"><span>${meal.strMeal}</span></div>
            <button id="fav-btn">
                <i class="fa-heart favIcon"></i>
            </button>
        </div>
    `
    mealContainer.appendChild(content);
    //좋아요 버튼 토글 처리 
    setFavIcon(Boolean(localStorage.getItem(meal)));
    const favBtn = document.querySelector('#fav-btn');
    favBtn.addEventListener('click',()=>favIconToggle(meal));
    //팝업 처리
    drawMealPopup(meal);
    return content;
}

//좋아요 아이콘 세팅
function setFavIcon(isFav){
    const fav = document.querySelector('.favIcon');
    if(isFav){
        fav.classList.add('fas');
        fav.classList.remove('far');
    } else {
        fav.classList.add('far');
        fav.classList.remove('fas');
    }
}

function favIconToggle(meal){ 
    //좋아요 = fas , 좋아요x = far
    // const fav = document.querySelector('.favIcon');
    if(localStorage.getItem(meal.strMeal)){
        setFavIcon(false)
        localStorage.removeItem(meal.strMeal);
    } else{
        setFavIcon(true);
        localStorage.setItem(meal.strMeal,meal.strMealThumb);
    }
    getFavList();
}

//Meal 팝업 그리기
function drawMealPopup(meal) {
    popupContent.innerHTML = '';
    //재료 배열 생성하기
    const ingredient = [];
    for (let i = 1; i <= 20; i++) {
        if (meal["strIngredient" + i]) {
            ingredient.push(`${meal["strIngredient" + i]} :  ${meal["strMeasure" + i]}`)
        } else break;
    }
    //Create Popup Contents
    const popupInfo = document.createElement('div');
    popupInfo.classList.add('recipe-info')
    popupInfo.innerHTML = `
        <button id="popup-btn"><i class="fas fa-times"></i></button>
        <h1>${meal.strMeal}</h1>    
        <div class="recipe-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        </div>
        <p>${meal.strInstructions}</p>
        <h3>Ingredients</h3>
        <ul>
            ${ingredient.map(ing => `
                <li>${ing}</li>
            `).join('')}
        <ul>
    `
    popupInfo.querySelector('#popup-btn').addEventListener('click', closePopup);
    popupContent.appendChild(popupInfo);
}
//Popup 보여주기/숨기기 함수
function showPopup() {
    popupContainer.classList.remove('hidden');
}
function closePopup() {
    popupContainer.classList.add('hidden');
}


//리스트에서 Meal 누르면 삭제 처리
function removeFavList(key){
    if(confirm("진짜 삭제하시겠습니까?")){
        localStorage.removeItem(key);
        getFavList();
    }   
}

function getFavList(){
    const favlist=[];
    favMeals.innerHTML='';
    for(let i=0;i<localStorage.length;i++){
        const name = localStorage.key(i);
        const imgUrl = localStorage.getItem(name);
        const li = document.createElement('li');
        li.innerHTML= `
            <div class="fav-img"><img src=${imgUrl} /></div>
            <div class="fav-info">${name}</div>    
        `
        li.addEventListener('click',()=>removeFavList(name))
        favMeals.appendChild(li);
    }
}

function render() {
    getFavList();
    showRandom();
}

render();


//외부영역 클릭시 popup창 닫기
document.addEventListener('mouseup', function (e) {
    if (e.target.classList.contains('popup-container')) closePopup();
})
