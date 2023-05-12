import Gameboard from './Gameboard.js';
import { isValidMove, randomIndex } from './util.js';

const PlayerProto = {
  attack: function (index, oppBoard) {
    if (!isValidMove(index, oppBoard)) {
      return false;
    }
    return oppBoard.receiveAttack(index);
  },

  attackRandom: function (oppBoard) {
    let index;
    let count = 0;
    do {
      index = randomIndex(oppBoard.size);
      if (count === 1000) {
        throw new Error('1000 tries for attackRandom() in Player.js');
      }
    } while (!isValidMove(index, oppBoard));
    return this.attack(index, oppBoard);
  },
};

const Player = function (name, boardSize = 7) {
  const Player = Object.create(PlayerProto);
  Player.board = Gameboard(boardSize);
  Player.name = name;
  return Player;
};

export default Player;
