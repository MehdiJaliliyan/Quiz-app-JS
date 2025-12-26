const playAgainBtn = document.querySelector("#play_again");
const homeBtn = document.querySelector("#home");

playAgainBtn.addEventListener("click", () => {
  window.location.assign("../index.html");
});

homeBtn.addEventListener("click", () => {
  window.localStorage.assign("start.html");
});
