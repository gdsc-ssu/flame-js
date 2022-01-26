// 서치바
// 프로필 이미지, 이름, 자기소개, 팔로워/팔로잉/레포개수, 레포 링크

const $searchForm = document.querySelector('.search-form');
const $searchInput = document.querySelector('.search-form__input');

const GITHUB_SEARCH_URL = 'https://api.github.com/users/';

const getSearchData = async (name) => {
  const searchURL = GITHUB_SEARCH_URL + name;
  const reposURL = searchURL + '/repos';

  const searchRes = await fetch(searchURL);
  const searchData = await searchRes.json();

  const reposRes = await fetch(reposURL);
  const reposData = await reposRes.json();

  const result = { searchData, reposData };
  return result;
};

const showProfile = (searchData, reposData) => {
  const $profileImg = document.querySelector('.profile-img__real');
  const $profileName = document.querySelector('.profile-info__name');
  const $profileBio = document.querySelector('.profile-info__bio');
  const $profileFollowers = document.querySelector('.followers-number');
  const $profileFollowing = document.querySelector('.following-number');
  const $profileReposNum = document.querySelector('.repos-number');
  const $profileReposData = document.querySelector('.profile-info__repos');

  $profileImg.src = searchData.avatar_url;
  $profileName.textContent = searchData.name;
  $profileBio.textContent = searchData.bio;
  $profileFollowers.textContent = searchData.followers;
  $profileFollowing.textContent = searchData.following;
};

const handleSearch = async (e) => {
  e.preventDefault();

  const { searchData, reposData } = await getSearchData($searchInput.value);
  showProfile(searchData, reposData);

  $searchInput.value = '';
};

$searchForm.addEventListener('submit', handleSearch);
