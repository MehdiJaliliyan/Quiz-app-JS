import { questions } from "./database.js";

const questionText = document.getElementById("question");
const choicesBtn = [...document.getElementsByClassName("choice_text")];
const progressBar = document.querySelector(".progress_bar-line");
const progressLabel = document.querySelector("#progress_label");
const timerElement = document.querySelector(".timer");

let questionCounter = 0;
let scores = 0;
let progressBarWidth = 0; 

const SCORE = 10;
const PROGRESS = 20;

const getRandomQuestion = (questions) => {
  const randomArray = new Set();
  while (randomArray.size < 5) {
    randomArray.add(Math.floor(Math.random() * questions.length));
  }
  return Array.from(randomArray).map((i) => questions[i]);
};

const questionsData = getRandomQuestion(questions);

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const displayQuestions = (counter) => {
  if (counter >= questionsData.length) return;

  // put question with number of index in to a variable and show question text 
  const currentQuestion = questionsData[counter];
  questionText.innerText = currentQuestion.question;

  // Create choices list with correct answer
  let allChoices = [...currentQuestion.choices];
  

  // Ensure the correct answer is included in the choices
  if (!allChoices.includes(currentQuestion.answer)) {
    allChoices.push(currentQuestion.answer);
  }

// Shuffle the options/choices
  const shuffledChoices = shuffleArray(allChoices);

  // Display choices
  choicesBtn.forEach((btn, index) => {
    if (index < shuffledChoices.length) {
      btn.innerText = shuffledChoices[index];
      btn.style.pointerEvents = "auto"; // active btn
    } else {
      btn.innerText = "";
      btn.style.pointerEvents = "none"; // disable btn
    }
  });

  // Update progress bar
  progressBarWidth = (counter + 1) * PROGRESS;
  progressBar.style.width = `${progressBarWidth}%`;
  progressLabel.innerText = `Question ${counter + 1}/5`;
};

const choiceHandler = (e) => {
  // ِDisable checking until next question
  choicesBtn.forEach((btn) => {
    btn.style.pointerEvents = "none";
  });

  const selectedAnswer = e.target.innerText;
  const currentQuestion = questionsData[questionCounter];

  // Check the answer
  if (selectedAnswer === currentQuestion.answer) {
    scores += SCORE;
    e.target.style.backgroundColor = "#4CAF50"; 
  } else {
    e.target.style.backgroundColor = "#F44336"; 

    // Show the correct answer
    choicesBtn.forEach((btn) => {
      if (btn.innerText === currentQuestion.answer) {
        btn.style.backgroundColor = "#4CAF50";
      }
    });
  }

  // Delay before showing the next question
  setTimeout(() => {
    questionCounter++;

    if (questionCounter >= questionsData.length) {
      // Save the score and go to the end page
      localStorage.setItem("finalScore", scores);
      window.location.assign("src/end.html");
      return;
    }

    // Reset Button color
    choicesBtn.forEach((btn) => {
      btn.style.backgroundColor = "";
    });

    displayQuestions(questionCounter);
  }, 1500); // 1.5 Second Delay
};

// Start app
choicesBtn.forEach((btn) => {
  btn.addEventListener("click", choiceHandler);
});

// Show first question
displayQuestions(questionCounter);

let timeLeft = 60 * 5; // Convert 5 min to second

const updateTimer = () => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // show mm:ss
  timerElement.innerText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  // When the timer riches zero
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    alert("⏰ زمان تمام شد!");
    window.location.assign("src/end.html");
  }

  timeLeft--;
};

// Run the timer each second
updateTimer(); // Initial execution
const timerInterval = setInterval(updateTimer, 1000);
