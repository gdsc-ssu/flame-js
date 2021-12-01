const quizData = [
    {
        question: "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    
    {
        question: "Who is the President of US?",
        a: "Florin Pop",
        b: "Donald Trump",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a",
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct: "b",
    },
];

const quizTitle = document.querySelector("h2");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let step = 0;
let score = 0;
loadQuiz();

function loadQuiz(){
    quizTitle.innerText = quizData[step].question;
    a_text.innerText = quizData[step].a;
    b_text.innerText = quizData[step].b;
    c_text.innerText = quizData[step].c;
    d_text.innerText = quizData[step].d;
}
console.log(document.getElementsByName("answer"));
function submit(){
    const answers = document.getElementsByName("answer")
    for (let i = 0; i<answers.length; i++){
        if (answers[i].checked){
            if(answers[i].id == quizData[step].correct ){
                score++;
                break;
            }
        }
    }
    if(step < quizData.length -1 ){
        step++;
        loadQuiz();
        for (let i = 0; i<answers.length; i++){
            answers[i].checked = false;
        }
    } else {
        const card = document.querySelector('#quiz-content');
        const result = document.querySelector('#result');
        card.classList.add('no-display');
        result.classList.remove('no-display');

        const scoreText = document.querySelector('#score');
        scoreText.innerText = `${score}`;
        quizTitle.innerText = 'Score';
    }
};