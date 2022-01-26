const API_BASE_URL = "https://api.github.com";

// interface User {
//   id: number;
//   avatar_url: string;
//   html_url: string;
//   followers string;
//   following: string;
//   repos_url: string;
//   public_repos: number;
//   name: string;
//   bio: string;
// }

async function getUser(username) {
  try {
    const response = await fetch(API_BASE_URL + `/users/${username}`);
    const result = await response.json();
    return result;
  } catch (e) {
    return undefined;
  }
}

const SkeletonHTML = ``;

async function renderRepos(reposUrl) {
  try {
    const response = await fetch(reposUrl);
    const result = await response.json();
    console.log(result);
    let reposHTML = "";
    result.forEach((repo) => {
      reposHTML += `
      <div class="repo-card">
        <span class="repo-title">${repo.name}</span>
      </div>
    `;
    });
    return `
      <div class="profile-info-repos">
        ${reposHTML}
      </div>
    `;
  } catch (e) {
    return "";
  }
}

async function renderCard(user) {
  const reposHTML = await renderRepos(user.repos_url);
  const cardHTML = `
    <div class="profile-card">
      <img class="profile-img" src="${user.avatar_url}" />
      <div class="profile-info">
        <h2>${user.name}</h2>
        <p class="profile-info-bio">${user.bio ? user.bio : "(no bio)"}</p>
        <div class="profile-info-detail">
          <span class="number">${user.followers}</span>
          <span class="label">Followers</span>
          <span class="number">${user.following}</span>
          <span class="label">Following</span>
          <span class="number">${user.public_repos}</span>
          <span class="label">Repos</span>
        </div>
        ${reposHTML}
      </div>
    </div>
  `;

  document.querySelector("#profile-card-wrap").innerHTML = cardHTML;
}

async function searchUser() {
  const inputText = document.querySelector("#search").value;
  const user = await getUser(inputText);
  await renderCard(user);
}
