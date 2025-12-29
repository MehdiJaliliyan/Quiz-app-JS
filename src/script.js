const startGameBtn = document.querySelector('.btn')
console.log(startGameBtn);

startGameBtn.addEventListener('click',() => {
  window.location.assign('/src/main.html')
})