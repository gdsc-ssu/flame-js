//Token
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOGIwZWY0ZjRhODE3NmE0MDVjNGI4MDhlZWM4MWViMSIsInN1YiI6IjYxZGU5NjI0YzE3NWIyMDA2NjRlOGQ3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mvhgWDex31XX3N2dGDroaMBrzVyEaulNRCpwUTaPNUA


//search
//https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false


const api_key='08b0ef4f4a8176a405c4b808eec81eb1';

const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?&api_key=${api_key}&query=`;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w1280';

const getMovies = async () => {
    const resp = await fetch(endpoint);
    const data = await resp.json();
    return data.results;
}

const createCard = (data) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = `${data.id}`;
    card.innerHTML = `<div class="popup"><span class="movie-overview">${data.overview}</span></div>
    <img class="movie-poster" src="${imageBaseUrl + data.poster_path}" width="150px"/>
    <div class="movie-info">
    <div class="movie-name">${data.title}</div>
    <div class="movie-avg">${data.vote_average}</div>
    </div>`;

    return card;
}

const showMovies = (dataList) =>{
    const main = document.createElement('main');
    dataList.forEach((data) => {
        const card = createCard(data);
        main.append(card);
    });

    const body = document.querySelector('body');
    const previousMain = document.querySelector('main');
    if (previousMain) {
        previousMain.replaceWith(main);
    }
    else body.append(main);
}

const searchMovies = async (inputText) => {
    const response = await fetch(searchUrl + inputText);
    const result = await response.json();
    console.log(result);
    return result.results;
}

const searchInput = async () => {
    const inputTile = document.querySelector('#search').value
    console.log(inputTile);
    const searchResult = await searchMovies(inputTile);
    showMovies(searchResult);
}

const init = async () => {
    const movies = await getMovies();
    showMovies(movies);
}
init();

// const movies = await getMovies();
// console.log(movies)