const playAgainBtn = document.querySelector("#play_again");
const homeBtn = document.querySelector("#home");
const finalScore = document.querySelector('.score')

playAgainBtn.addEventListener("click", () => {
  window.location.assign("../index.html");
});

homeBtn.addEventListener("click", () => {
  window.location.assign("start.html");
});

finalScore.innerText = `Final Score: ${localStorage.getItem('finalScore')}`
