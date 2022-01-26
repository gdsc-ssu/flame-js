



async function getProfileInfo(githubId){
    const response = fetch(`https://api.github.com/users/${githubId}`);
    const res = await response;
    return await res.json();
}
async function getRepoList(repoUrl){
    const response = fetch(`${repoUrl}`);
    const res = await response;
    return await res.json();
}
const getResponse = async (githubId)=>{
   const result = await getProfileInfo(githubId)
   const {avatar_url,name,followers,following,public_repos,bio,repos_url} = result;
   const repoList = await getRepoList(repos_url)
    console.log(repoList)
   document.getElementById("info-name").textContent=name
   document.getElementById("info-introduce").textContent=bio
   document.getElementById("followers").innerHTML = `Followers `+followers
   document.getElementById("following").innerHTML = 'Following' + following
   document.getElementById("repos").innerHTML =  public_repos + ' Repos'
   document.getElementById("profile-img").src = avatar_url
   console.log(result)
   repoList.map((index)=>{
    let li = document.createElement('span');
    let litext = document.createTextNode(index.name);
    li.appendChild(litext);
    document.getElementById("info-repo-wrapper").appendChild(li)
   })

}

window.onload = ()=>{
    const searchBar = document.getElementById('search-bar')
    searchBar.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
           
            console.log( e.target.value)
            getResponse(e.target.value)
        }
    });
}