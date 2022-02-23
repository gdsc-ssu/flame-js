// 입력 받을 값
const $pwdOutput = document.querySelector('.pwd');
const $pwdLength = document.getElementById('pwd-length');
const $upperCheck = document.getElementById('pwd-lower-letter');
const $lowerCheck = document.getElementById('pwd-upper-letter');
const $numberCheck = document.getElementById('pwd-number');
const $symbolCheck = document.getElementById('pwd-symbol');
const $submitBtn = document.querySelector('.pwd-form__btn');

// 로직
const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_-+=';

const getEachPasswordTypeNumArr = (passwordLength, passwordTypeNum) => {
  const lenArr = [];
  let lenSum = 0;
  while (passwordTypeNum) {
    passwordTypeNum--;

    const len = passwordTypeNum
      ? Math.floor(Math.random() * (passwordLength - passwordTypeNum - lenSum)) + 1
      : passwordLength - lenSum;

    lenArr.push(len);
    lenSum += len;
  }

  return lenArr;
};

const getLowerRandom = () => {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
};

const getUpperRandom = () => {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
};

const getNumberRandom = () => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

const getSymbolRandom = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = (passwordLength) => {
  let upperChecked = $upperCheck.checked;
  let lowerChecked = $lowerCheck.checked;
  let numberChecked = $numberCheck.checked;
  let symbolChecked = $symbolCheck.checked;
  let checkedButtonLength = upperChecked + lowerChecked + numberChecked + symbolChecked;

  let pwd = [];

  const lenArr = getEachPasswordTypeNumArr(passwordLength, checkedButtonLength);

  while (lenArr.length) {
    let len = lenArr.shift();

    if (upperChecked) {
      while (len) {
        pwd.push(getUpperRandom());
        len--;
      }
      upperChecked = false;
    } else if (lowerChecked) {
      while (len) {
        pwd.push(getLowerRandom());
        len--;
      }
      lowerChecked = false;
    } else if (numberChecked) {
      while (len) {
        pwd.push(getNumberRandom());
        len--;
      }
      numberChecked = false;
    } else if (symbolChecked) {
      while (len) {
        pwd.push(getSymbolRandom());
        len--;
      }
      symbolChecked = false;
    } else {
      return 'click any button';
    }
  }

  return pwd.sort(() => 0.5 - Math.random()).join('');
};

const makePWD = (e) => {
  e.preventDefault();

  const newPwd = generatePassword($pwdLength.value);
  $pwdOutput.innerText = newPwd || 'Nope';
};

$submitBtn.addEventListener('click', makePWD);
