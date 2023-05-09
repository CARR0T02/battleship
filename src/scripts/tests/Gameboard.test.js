import Gameboard from '../Gameboard';
import createShip from '../Ship';

describe('Gameboard', () => {
  const testBoard = Gameboard();
  const horShip = createShip(2);
  const vertShip = createShip(3);

  test('place ship of length 2 (horizontal) at [0,0]', () => {
    testBoard.placeHorizontal(0, horShip);
    expect(testBoard.shipTiles.get(0)).toBe(horShip);
    expect(testBoard.shipTiles.get(1)).toBe(horShip);
  });

  test('place ship of length 3 (vertical) at [7,7]', () => {
    testBoard.placeVertical(49, vertShip);
    expect(testBoard.shipTiles.get(49)).toBe(vertShip);
    expect(testBoard.shipTiles.get(42)).toBe(vertShip);
    expect(testBoard.shipTiles.get(35)).toBe(vertShip);
  });

  test('receiveAttack on an empty tile', () => {
    expect(testBoard.receiveAttack(3)).toBe(false);
    expect(testBoard.receiveAttack(17)).toBe(false);
    expect(testBoard.receiveAttack(47)).toBe(false);
  });

  test('receiveAttack on a ship', () => {
    expect(testBoard.receiveAttack(1)).toBe(horShip);
    expect(horShip.hitsTaken).toBe(1);
  });

  test('tracks all attacks', () => {
    const testAttacks = new Set([3, 17, 47, 1]);
    expect(testBoard.shots).toEqual(testAttacks);
  });

  test('shows that NOT all ships have sunk', () => {
    expect(testBoard.isAlive()).toBe(true);
  });

  test('shows that all ships have sunk', () => {
    testBoard.receiveAttack(0);
    testBoard.receiveAttack(49);
    testBoard.receiveAttack(42);
    testBoard.receiveAttack(35);
    console.log(testBoard.shipTiles.size);
    expect(testBoard.isAlive()).toBe(false);
  });
});
