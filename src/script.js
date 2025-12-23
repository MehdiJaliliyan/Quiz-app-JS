import {questions} from "./database.mjs";

const startQuiz = document.getElementById('start_quiz');
const displayBox = document.getElementById('display_box');
const question = document.getElementById('question');
const listLI = document.querySelectorAll('.answer');
const nextBtn = document.querySelector('.next');

listLI.forEach(question => question.onclick = checkAnswer);

const quizStates = {
    currentQuestionIndex: 0,
    score: 0,
    randomQuestions: getRandomQuestion(),
    isAnswered: new Array(10).fill(false)
}

function getRandomQuestion() {
    const questionsCopy = [...questions]
    const randomQuestion = []

    while (randomQuestion.length < 10) {
        const randomNumber = Math.floor(Math.random() * questionsCopy.length);
        const question = questionsCopy[randomNumber];
        randomQuestion.push(question);
        questionsCopy.splice(randomNumber, 1);
    }
    return randomQuestion
}

function showQuestion() {
    const questionIndex = quizStates.currentQuestionIndex
    const currentQuestion = quizStates.randomQuestions[questionIndex];

    question.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        listLI[index].innerText = answer;
    })
}

function checkAnswer(e) {

    const userAnswer = e.target;
    if (userAnswer) {
        nextBtn.classList.remove('disable');
        userAnswer.classList.add('selected');
    }
}


