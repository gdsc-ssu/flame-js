const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    //입력한 Password Length 받아오기
    const len = lenEl.value;

    //처음 설정한 비밀 번호. 필요조건에 의해 앞에 최대 4가지 변수들이 차례대로 있다
    let password = "";
    //차례대로 있는 비밀번호를 방지하기 위해 새로운 비밀번호를 만들기 위한 변수
    let real_password = ""

    //대문자 체크
    if (upperEl.checked) {
        password += getUppercase();
        console.log(password);
    }
    //소문자 체크
    if (lowerEl.checked) {
        password += getLowercase();
        console.log(password);
    }
    //숫자 체크
    if (numberEl.checked) {
        password += getNumber();
        console.log(password);
    }
    //특수문자 체크
    if (symbolEl.checked) {
        password += getSymbol();
        console.log(password);
    }
    if (password == ""){
        pwEl.innerText = password;
        alert("비밀번호 생성시 포함하고 싶은 문자 형태를 선택하세요!")
        return
    }
    //이순서대로 진행하면 -> 최대 대문자,소문자,숫자,특수문자 순으로 입력된 4개의 요소가 나온다.
    //나머지 부분의 범위는 password.length부터 입력받은 len까지이며
    //generateX를 통해 추가한다.
    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }
    console.log(password, "first password");

    //처음에 생성한 비밀번호는 최대 4가지가 순서가 고정이므로 완성된 password를 기반으로
    //순서를 랜덤하게 배정하여 새로운 비밀번호를 생성할 것이다.
    let randomIndexArray = []
    for (i=0; i<len; i++) {   
        randomNum = Math.floor(Math.random() * len)
        if (randomIndexArray.indexOf(randomNum) === -1) {
            real_password += password[randomNum]
        
        } else { //if the randomNum is already in the array retry
            i--
        }
    }
    console.log(real_password, "last password");
    pwEl.innerText = real_password;
}

function generateX() {
    const xs = [];
    //대문자 체크시 생성
    if (upperEl.checked) {
        xs.push(getUppercase());
    }
    //소문자 체크시 생성
    if (lowerEl.checked) {
        xs.push(getLowercase());
    }
    //슷자 체크시 생성
    if (numberEl.checked) {
        xs.push(getNumber());
    }
    //특수문자 체크시 생성
    if (symbolEl.checked) {
        xs.push(getSymbol());
    }
    //체크된 것이 없으면 생성하지 않는다
    if (xs.length === 0) return "";

    //여기가 메인 알고리즘
    //각각 체크된 문자들이 추가된 list xs에는 최대 4개의 원소를 가지고 있고
    //각각의 문자들은 하나만 존재한다.
    //그중에서 하나를 뽑아 리턴하여 password의 다음 문자열에 추가해준다.
    return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (password == "") {
        alert("비밀번호 생성시 포함하고 싶은 문자 형태를 선택하세요!")
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("비밀번호를 클립보드에 복사했습니다👍");
});
