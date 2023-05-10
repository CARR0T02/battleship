// Gameboard is 7x7 by default and 0 - 48 index

const GameboardProto = {
  // Places ship on board with index being the left-most tile
  placeHorizontal: function (index, ship) {
    let tiles = [];
    let row = Math.floor(index / this.size);
    for (let i = 0; i < ship.length; i++) {
      let currRow = Math.floor(index / this.size);
      if (
        this.shipTiles.has(index) ||
        index < 0 ||
        index >= this.size ** 2 ||
        currRow != row
      ) {
        return false;
      }
      tiles.push(index++);
    }
    for (const tile of tiles) {
      this.shipTiles.set(tile, ship);
    }
    return true;
  },

  // Places ship on board with index being the top-most tile
  placeVertical: function (index, ship) {
    let tiles = [];
    let column = index % 7;
    for (let i = 0; i < ship.length; i++) {
      let currColumn = index % 7;
      if (
        this.shipTiles.has(index) ||
        index < 0 ||
        index >= this.size ** 2 ||
        currColumn != column
      ) {
        return false;
      }
      tiles.push(index);
      index -= 7;
    }
    for (const tile of tiles) {
      this.shipTiles.set(tile, ship);
    }
    return true;
  },

  // Logs the tile to shots. If it hits, remove the tile from shipTiles and log the hit to the ship.
  receiveAttack: function (index) {
    this.shotsReceived.add(index);
    if (!this.shipTiles.has(index)) {
      return false;
    }
    let ship = this.shipTiles.get(index);
    ship.hit();
    this.shipTiles.delete(index);
    return ship;
  },

  isAlive: function () {
    return this.shipTiles.size ? true : false;
  },
};

const Gameboard = function (boardSize = 7) {
  const Gameboard = Object.create(GameboardProto);
  Gameboard.shipTiles = new Map();
  Gameboard.shotsReceived = new Set();
  Gameboard.size = boardSize;
  return Gameboard;
};

export default Gameboard;