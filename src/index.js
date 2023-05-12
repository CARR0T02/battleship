import './style.css';
import {
  newGame,
  playTurn,
  playRandom,
  getCurrPlayer,
  getOppPlayer,
} from './scripts/Game.js';
// TODO winner screen
// TODO hot seat game

const attackBoard = document.querySelector('.opp-board');
const friendlyBoard = document.querySelector('.player-board');

function initialise() {
  startNewGame();
  const main = document.querySelector('#main');
  const newGameBtn = document.createElement('button');
  newGameBtn.setAttribute('id', 'new-game-btn');
  newGameBtn.classList.toggle('none');
  newGameBtn.textContent = 'New Game';
  main.appendChild(newGameBtn);
  newGameBtn.addEventListener('click', (e) => {
    startNewGame();
    e.target.classList.toggle('none');
  });
}
function startNewGame() {
  newGame('Gabe');
  clearBoards();
  populateBoards();
  displayFriendlyShips(getCurrPlayer());
  attackBoard.addEventListener('click', playAgainstAI);
}

function playAgainstAI(e) {
  const index = Number(e.target.dataset.index);
  if (isNaN(index)) {
    return;
  }
  let currPlayer = getCurrPlayer();
  let oppPlayer = getOppPlayer();
  let response = playTurn(index);
  if (response === false) {
    return;
  }
  loadShotsFired(oppPlayer, attackBoard);
  if (response === true) {
    attackBoard.removeEventListener('click', playAgainstAI);
    displayNewGameButton();
    return;
  }
  playRandom();
  loadShotsFired(currPlayer, friendlyBoard);
}

function displayFriendlyShips(player) {
  const keys = player.board.shipTiles.keys();
  for (const index of keys) {
    const tile = friendlyBoard.querySelector(`[data-index='${index}']`);
    tile.classList.add('ship');
  }
}

function loadShotsFired(player, boardHTML) {
  let status;
  player.board.shotsReceived.forEach((response, index, map) => {
    const tile = boardHTML.querySelector(`[data-index='${index}']`);
    if (response === null) {
      status = 'miss';
    } else if (typeof response === 'object') {
      if (response.isSunk()) {
        tile.classList.add('sunk');
      }
      status = 'hit';
    }
    const shot = document.createElement('div');
    shot.setAttribute('disabled', '');
    shot.classList.add('shot', status);
    if (tile.hasChildNodes()) {
      return;
    }
    if (!tile.getAttribute('disabled')) {
      tile.setAttribute('disabled', '');
    }
    tile.appendChild(shot);
  });
}

function clearBoards() {
  const boards = [friendlyBoard, attackBoard];
  for (const boardHTML of boards) {
    while (boardHTML.firstChild) {
      boardHTML.removeChild(boardHTML.firstChild);
    }
  }
}

function populateBoards() {
  const boardSize = getCurrPlayer().board.size;
  const boards = [friendlyBoard, attackBoard];
  for (const boardHTML of boards) {
    for (let i = boardSize ** 2 - 1; i > -1; i--) {
      const tile = document.createElement('div');
      tile.setAttribute('data-index', i.toString());
      tile.classList.add('tile');
      boardHTML.appendChild(tile);
    }
  }
}

function displayNewGameButton() {
  const newGameBtn = document.querySelector('#new-game-btn');
  newGameBtn.classList.toggle('none');
}

initialise();
