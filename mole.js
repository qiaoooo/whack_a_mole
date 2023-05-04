const holes = document.querySelectorAll(".wgs__dirt-pile");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".wgs__mole-head--hidden");
const progress = document.getElementById("myBar");

let lastMole;
let timeUp;
let score;
let timeleft;

function downloadTimer() {
  let int = setInterval(cb, 1000);
  function cb() {
    if (timeUp) {
      clearInterval(downloadTimer);
    } else {
      timeleft += 1;
      progress.style.width = timeleft * 10 + "%";
      progress.innerHTML = timeleft * 1 + "s";
    }
  }
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomMole(moles) {
  const idx = Math.floor(Math.random() * moles.length);
  const mole = moles[idx];
  if (mole === lastMole) {
    //console.log("duplicate Mole");
    return randomMole(moles);
  }
  lastMole = mole;
  return mole;
}

function popUpRandomMole() {
  const time = randomTime(200, 1000);
  const mole = randomMole(moles);
  //console.log("before", window.getComputedStyle(mole).top);
  mole.classList.add("wgs__mole-head");
  //console.log("after", window.getComputedStyle(mole).top);

  setTimeout(() => {
    mole.classList.remove("wgs__mole-head");
    if (!timeUp) popUpRandomMole();
  }, time);
}

function whack(event) {
  score++;
  this.classList.remove("wgs__mole-head");
  this.classList.add("wgs__mole-head--whacked");

  scoreBoard.textContent = score;
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  timeleft = 0;
  downloadTimer();
  popUpRandomMole();
  setTimeout(() => (timeUp = true), 10000);
}

moles.forEach((mole) => mole.addEventListener("click", whack));
