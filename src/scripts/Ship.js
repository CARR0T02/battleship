const protoShip = {
  hit: function () {
    if (this.isSunk()) {
      throw new Error('Ship is already sunk');
    }
    this.hitsTaken += 1;
  },
  isSunk: function () {
    return this.hitsTaken === this.length;
  },
};

const createShip = function (length) {
  if (length <= 0) {
    throw new Error(`Invalid length given for ship: ${length}`);
  }
  let ship = Object.create(protoShip);
  ship.hitsTaken = 0;
  ship.length = length;
  return ship;
};

export default createShip;
