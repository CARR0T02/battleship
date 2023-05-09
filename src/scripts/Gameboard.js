// Gameboard is 7x7 by default

const GameboardProto = {
  // Places ship on board with index being the left-most tile
  placeHorizontal: function (index, ship) {
    for (let i = 0; i < ship.length; i++) {
      this.shipTiles.set(index++, ship);
    }
  },

  // Places ship on board with index being the top-most tile
  placeVertical: function (index, ship) {
    for (let i = 0; i < ship.length; i++) {
      this.shipTiles.set(index, ship);
      index -= 7;
    }
  },

  // Logs the tile to shots. If it hits, remove the tile from shipTiles and log the hit to the ship.
  receiveAttack: function (index) {
    this.shots.add(index);
    if (!this.shipTiles.has(index)) {
      return false;
    }
    let ship = this.shipTiles.get(index);
    ship.hit();
    this.shipTiles.delete(index);
    return true;
  },

  isAlive: function () {
    return this.shipTiles.size ? true : false;
  },
};

const Gameboard = function (boardSize = 7) {
  const Gameboard = Object.create(GameboardProto);
  Gameboard.shipTiles = new Map();
  Gameboard.shots = new Set();
  Gameboard.size = boardSize;
  return Gameboard;
};

export default Gameboard;
