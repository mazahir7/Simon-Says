"use strict";

const simonBoard = document.querySelector(".simon-container");
const play = document.getElementById("play");
const playAgain = document.querySelector(".play-again");
const restartGame = document.getElementById("restart");
const levels = document.querySelector(".level");


// arrays to keep the track of computer's input
let computerSequence = [];


let level = 1;
let playerChance = 0;

// Event listener for start the game through a keyPress or on button click
window.addEventListener("keydown", () => {
  gameStarting();
}, { once: true })

play.addEventListener("click", () => {
  gameStarting();
}, { once: true });


// Event listener for restarting / replaying the game
restartGame.addEventListener("click", () => gameStarting());


// Starting a new game and resetting all the values back to 0
function gameStarting() {

  // Resetting Values
  computerSequence = [];
  level = 1;
  playerChance = 0;

  // Displaying the levels to the player
  levels.innerHTML = `Level:${String(level).padStart(2, "0")}`;

  playAgain.style.display = "none"
  document.querySelector("body").classList.add("play");
  simonBoard.style.animation = "spinner 2s cubic-bezier(.48, .42, .19, .62)";

  setTimeout(() => {
    gameLevel();
  }, 2000);
}

// Incrementing the game level and Updating the computerSequence
function gameLevel() {
  computerSequence.push(randomPicker() + 1);
  setTimeout(() => {
    playComputerSequence();
  }, 1000);

  levels.innerHTML = `Level:${String(level).padStart(2, "0")}`;
  level++;
}

simonBoard.addEventListener("click", function (e) {
  const target = e.target;

  if (!target.classList.contains("say")) return;

  const playerChoice = +target.getAttribute("data-count");

  // Checking if the user sequence is same as that of the computer sequence
  if (playerChoice !== computerSequence[playerChance]) {
    playAgain.style.display = "flex"
  }

  playerChance++;

  // Incrementing the level of the game when the user passes the current level
  if (playerChance === computerSequence.length) {
    gameLevel();
  }
});


// Displaying the computer sequence to the player for each level
function playComputerSequence() {
  playerChance = 0;
  computerSequence.forEach((s, i) => {
    setTimeout(() => {
      simonSaying(s);
    }, 1000 * i);
  });
}

// Adding and Removing effects from each disk / tile
function simonSaying(say) {
  const disk = document.querySelector(`.say-${say}`);
  addEffect(disk);
  setTimeout(() => {
    removeEffect(disk);
  }, 500);
}

// Random number generator b/w [0, 1, 2, 3]
const randomPicker = () => {
  return Math.floor(Math.random() * 4);
}

// Adding the effect to the tile
const addEffect = (target) => {
  target.style.filter = "brightness(200%)";
  target.style.borderWidth = "3px";
}

// removing the effect to the tile
const removeEffect = (target) => {
  target.style.filter = "brightness(100%)";
  target.style.borderWidth = "2px";
}