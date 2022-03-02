const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const main = document.getElementById("main");
const form = document.getElementById("form");
const current = document.getElementById("current");
const search = document.getElementById("search");
const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), { origin: "cors" });
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(city,respData);
}

function addWeatherToPage(city, data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <small>${city}</small>
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
        <small>${data.weather[0].main}</small>
        <button id = "comeback" onclick="window.location.reload();">다시 검색하기</button>
    `;
    // cleanup
    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K) {
    return Math.floor(K - 273.15);
}
current.addEventListener("click", (e) => {
    e.preventDefault();
    var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
      }
    getPosition()
    .then((position) => {
        console.log(position.coords.latitude);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        return getCityByLocation(lat,lng);
    }).then((data) => {
        getWeatherByLocation(data.name);
        form.style.display = 'none';
        current.style.display = 'none';
    })
    .catch((err) => {
        console.error(err.message);
    });
});
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;
    if (city) {
        form.style.display = 'none';
        current.style.display = 'none';
        var getPosition = function (options) {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
          }
        getPosition()
        .then((position) => {
            console.log(position.coords.latitude);
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            return getCityByLocation(lat,lng);
        }).then((data) => {
            getWeatherByLocation(data.name);
    
        })
        .catch((err) => {
            console.error(err.message);
        });
    }
});
async function getCityByLocation(lat,lng) {
    const reverse_url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${apikey}`;
    const resp = await fetch(reverse_url, { origin: "cors" });
    const respData = await resp.json();
    return respData[0]
}