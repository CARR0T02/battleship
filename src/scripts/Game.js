import Player from './Player.js';
import createShip from './Ship.js';

let player1, player2, currPlayer, oppPlayer;

let shipSizes = [2, 2, 3, 4];

const newGame = function (name1, name2 = 'AI') {
  player1 = Player(name1);
  player2 = Player(name2);
  currPlayer = player1;
  oppPlayer = player2;
  placeShips(player1);
  placeShips(player2);
};

const placeShips = function (player) {
  let orientation, index, response;
  for (const shipSize of shipSizes) {
    do {
      orientation = Math.floor(Math.random() * 2);
      index = Math.floor(Math.random() * player.board.size ** 2);
      if (orientation === 0) {
        response = player.board.placeHorizontal(index, createShip(shipSize));
      } else if (orientation === 1) {
        response = player.board.placeVertical(index, createShip(shipSize));
      }
    } while (!response);
  }
};

const playRandom = function () {
  let response = currPlayer.attackRandom(oppPlayer.board);
  if (response === false) {
    return response;
  }
  if (oppPlayer.board.isAlive()) {
    changeTurn();
    console.log(`${currPlayer.name}'s turn`);
    return response;
  } else {
    return endGame();
  }
};

// Returns true when game has ended, false if invalid move
// Returns ship if hit and null if miss
const playTurn = function (index) {
  let response = currPlayer.attack(index, oppPlayer.board);
  if (response === false) {
    return response;
  }
  if (oppPlayer.board.isAlive()) {
    changeTurn();
    console.log(`${currPlayer.name}'s turn`);
    return response;
  } else {
    return endGame();
  }
};

const changeTurn = function () {
  if (currPlayer === player1) {
    currPlayer = player2;
    oppPlayer = player1;
  } else {
    currPlayer = player1;
    oppPlayer = player2;
  }
};

const getCurrPlayer = function () {
  return currPlayer;
};

const getOppPlayer = function () {
  return oppPlayer;
};

const endGame = function () {
  console.log(`The winner is ${currPlayer.name}!`);
  return true;
};

export { newGame, playTurn, playRandom, getCurrPlayer, getOppPlayer };
