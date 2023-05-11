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
  let Ship = Object.create(protoShip);
  Ship.hitsTaken = 0;
  Ship.length = length;
  return Ship;
};

export default createShip;
