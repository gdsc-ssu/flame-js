const URL = "https://api.github.com/users/"

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const searchbar = document.querySelector('#searchbar');


let search = async (user) =>{
    const resp = await fetch(URL + user);
    const data = await resp.json();

    createCard(data);
}

let createCard = async (data) =>{
    console.log(data);

    const card = `
        <div class="card" id="${data.id}">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="${data.name}"/>
            </div>
            <div>
                <h1>${data.name}</h1>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}</li>
                    <li>${data.following}</li>
                    <li>${data.public_repos}</li>
                </ul>
            </div>
        </div>
    `
    main.innerHTML = card;
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const user = searchbar.value;
    console.log(searchbar.value);

    if(user){
        search(user);
        console.log("event!");

        searchbar.value = "";
    }
})