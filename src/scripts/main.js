'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

// Write your code here
const startButton = document.querySelector('.start');
const allDomCells = document.querySelectorAll('.field-cell');
const scoreElement = document.querySelector('.game-score');
const startMessage = document.querySelector('.message-start');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');

function updateMessage() {
  const gameStatus = game.getStatus();

  switch (gameStatus) {
    case 'idle':
      startMessage.classList.remove('hidden');
      winMessage.classList.add('hidden');
      loseMessage.classList.add('hidden');
      break;
    case 'playing':
      startMessage.classList.add('hidden');
      break;
    case 'win':
      winMessage.classList.remove('hidden');
      break;
    case 'lose':
      loseMessage.classList.remove('hidden');
      break;
  }
}

function updateScore(score) {
  scoreElement.textContent = score;
}

function renderField(elements) {
  const cellsValue = game.getState().flat();

  cellsValue.forEach((cell, index) => {
    elements[index].textContent = cell === 0 ? '' : cell;
  });
}

startButton.addEventListener('click', () => {
  if (startButton.classList.contains('restart')) {
    game.restart();
    startButton.classList.remove('restart');
    startButton.textContent = 'Start';
  } else {
    game.start();
  }

  renderField(allDomCells);
  updateScore(game.getScore());
  updateMessage();

  if (game.getStatus() === 'playing') {
    startButton.classList.add('restart');
    startButton.textContent = 'Restart';
  }
});

document.addEventListener('keydown', (ev) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  const key = ev.key;

  switch (key) {
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
  }

  renderField(allDomCells);
  updateScore(game.getScore());
  updateMessage();
});
