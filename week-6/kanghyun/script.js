// 서치바
// 프로필 이미지, 이름, 자기소개, 팔로워/팔로잉/레포개수, 레포 링크

const $searchForm = document.querySelector('.search-form');
const $searchInput = document.querySelector('.search-form__input');

const GITHUB_SEARCH_URL = 'https://api.github.com/users/';

const getSearchData = async (name) => {
  try {
    const searchURL = GITHUB_SEARCH_URL + name;
    const reposURL = searchURL + '/repos';

    const searchRes = await fetch(searchURL);
    const searchData = await searchRes.json();

    const reposRes = await fetch(reposURL);
    const reposData = await reposRes.json();

    const result = { searchData, reposData };
    return result;
  } catch (error) {
    console.log(error);
  }
};

const showProfile = (searchData, reposData) => {
  const $profileImg = document.querySelector('.profile-img__real');
  const $profileName = document.querySelector('.profile-info__name');
  const $profileBio = document.querySelector('.profile-info__bio');
  const $profileFollowers = document.querySelector('.followers-number');
  const $profileFollowing = document.querySelector('.following-number');
  const $profileReposNum = document.querySelector('.repos-number');
  const $profileReposBox = document.querySelector('.profile-info__repos-box');

  const $reposContainer = document.createElement('ul');
  reposData.forEach((repo) => {
    const $repoItem = document.createElement('li');
    $repoItem.className = 'repos-container';
    $repoItem.className = 'repos-item';
    $repoItem.textContent = repo.name;

    $reposContainer.appendChild($repoItem);
  });

  $profileImg.src = searchData.avatar_url;
  $profileName.textContent = searchData.name;
  $profileBio.textContent = searchData.bio;
  $profileFollowers.textContent = searchData.followers;
  $profileFollowing.textContent = searchData.following;
  $profileReposNum.textContent = reposData.length;

  $profileReposBox.innerHTML = '';
  $profileReposBox.appendChild($reposContainer);
};

const handleSearch = async (e) => {
  e.preventDefault();

  const { searchData, reposData } = await getSearchData($searchInput.value);
  showProfile(searchData, reposData);

  $searchInput.value = '';
};

$searchForm.addEventListener('submit', handleSearch);
