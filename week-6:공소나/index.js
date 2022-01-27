const APIURL = "https://api.github.com/users/";

const form = document.querySelector('#form');
const input = document.querySelector('#search');
const result = document.querySelector('#result');

// api fetch 후 유저 데이터 얻기.
async function getUserData(text){
    const res = await fetch(APIURL+text); 
    const userData = await res.json();
    const res2 = await fetch(APIURL+userData.name+'/repos');
    const repoData = await res2.json();
    return [userData,repoData];
}

//form submit
async function submitHandler(e){
    e.preventDefault();
    const [user,repos] = await getUserData(input.value);
    if (user.message === 'Not Found'){
        showMessage();
    }
    else {
        showProfile(user,repos);
    }
    input.value='';
}

//화면에 result 보여주기.
function showProfile(user,repos){
    result.innerHTML = '';
    result.innerHTML = `
        <img src=${user.avatar_url} />
        <div id='info'>
            <div id='name'>${user.name}</div>
            <div id='bio'>${user.bio}</div>
            <div id='activity'>
                <p>${user.followers} followers</p>
                <p>${user.following} followings</p>
                <p>${user.public_repos} repos</P>
            </div>
            <p id='repo-label'>Repos</p>
            <div id='repos'>
                ${repos.map(repo=>{
                    return `<p>${repo.name}</p>`
                }).join('')} 
            </div>
        </div>
    `
}

//결과 없을 시에.
function showMessage(){
    result.innerHTML = '';
    result.innerHTML = `
        <div>Search Again</div>
    ` 
}

form.addEventListener('submit',submitHandler);