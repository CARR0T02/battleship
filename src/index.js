import './style.css';
import { newGame, playTurn, getCurrPlayer } from './scripts/Game.js';

const playerBoard = document.querySelector('.player-board');
playerBoard.addEventListener('click', playMove);

// To Finish
function playMove(e) {
  let response = playTurn(Number(e.target.dataset.index));
  console.log(response);
}

// To Finish
function handleSunk(ship) {
  if (ship.isSunk()) {
    let arr = ship.location;
  }
}

newGame('Gabe');
