'use strict';

const random = Math.floor(Math.random() * 6 + 1);

const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
let activePlayer = document.querySelector('.player--active');

const newGame = document.querySelector('.btn--new');
const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

let currentScore1 = document.querySelector('#current--0');
let currentScore2 = document.querySelector('#current--1');

let actualScore1 = document.querySelector('#score--0');
let actualScore2 = document.querySelector('#score--1');

let gameOverText = '';

// New Game Functionality
newGame.addEventListener('click', () => {
  resetGame();
});

// reset Game
function resetGame() {
  currentScore1.textContent = 0;
  currentScore1.textContent = 0;
  actualScore1.textContent = 0;
  actualScore2.textContent = 0;
}
// Switch Active Players

function switchPlayers(p1, p0) {
  activePlayer.classList.replace(p1, p0);
}

function checkPlayerstatus(playerClass) {
  if (activePlayer.classList.contains(playerClass)) {
    return true;
  }
  return false;
}

function changeScore(player, score) {
  let temp = parseInt(player.textContent);
  player.textContent = temp + score;
}

function checkScore() {
  console.log('ITs happening');
  if (checkPlayerstatus('player--0')) {
    if (parseInt(actualScore1.textContent) >= 100) {
      console.log('This happened');
      showPopup('Player-1');
    }
  } else if (checkPlayerstatus('player--1')) {
    if (parseInt(actualScore2.textContent) >= 100) {
      showPopup('Player 2');
    }
  }
}

// Game Winner Popup
function showPopup(text) {
  console.log('reached here');
  let popup = document.querySelector('.popup');
  let winnerText = document.querySelector('.winner-text');
  winnerText.textContent = `${text} wins !`;
  popup.classList.remove('hidden');

  setTimeout(() => {
    popup.classList.add('hidden');
    resetGame();
  }, 3000);
}

rollDice.addEventListener('click', () => {
  console.log(`Active Plater is : ${activePlayer.classList}`);
  const random = Math.floor(Math.random() * 6 + 1);
  dice.setAttribute('src', `./dice-${random}.png`);

  if (random === 10) {
    if (checkPlayerstatus('player--0')) {
      currentScore1.textContent = 0;
      switchPlayers('player--0', 'player--1');
    } else {
      currentScore2.textContent = 0;
      switchPlayers('player--1', 'player--0');
    }
  } else {
    if (checkPlayerstatus('player--0')) {
      changeScore(currentScore1, random);
    } else {
      changeScore(currentScore2, random);
    }
  }
});

hold.addEventListener('click', () => {
  if (checkPlayerstatus('player--0')) {
    changeScore(actualScore1, parseInt(currentScore1.textContent));
    checkScore();
    currentScore1.textContent = 0;
    switchPlayers('player--0', 'player--1');
  } else {
    changeScore(actualScore2, parseInt(currentScore2.textContent));
    checkScore();
    currentScore2.textContent = 0;
    switchPlayers('player--1', 'player--0');
  }
});
