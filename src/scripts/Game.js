import Player from './Player.js';
import createShip from './Ship.js';

let player1, player2, currPlayer, oppPlayer;

const newGame = function (name1, name2 = 'AI') {
  player1 = Player(name1);
  player2 = Player(name2);
  currPlayer = player1;
  oppPlayer = player2;
  player1.board.placeHorizontal(0, createShip(3));
  player1.board.placeVertical(48, createShip(2));
  player2.board.placeHorizontal(0, createShip(3));
  player2.board.placeVertical(48, createShip(2));
};

// Returns true when game has ended
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

const endGame = function () {
  console.log(`The winner is ${currPlayer.name}!`);
  return true;
};

export { newGame, playTurn, getCurrPlayer };
