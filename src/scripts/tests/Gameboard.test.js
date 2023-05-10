import Gameboard from '../Gameboard';
import createShip from '../Ship';

describe('Gameboard', () => {
  const testBoard = Gameboard();
  const horShip = createShip(2);
  const vertShip = createShip(3);

  test('place ship of length 2 (horizontal) at [0,0]', () => {
    expect(testBoard.placeHorizontal(0, horShip)).toBe(true);
    expect(testBoard.shipTiles.get(0)).toBe(horShip);
    expect(testBoard.shipTiles.get(1)).toBe(horShip);
  });

  test('place ship of length 3 (vertical) at [6,6]', () => {
    expect(testBoard.placeVertical(48, vertShip)).toBe(true);
    expect(testBoard.shipTiles.get(48)).toBe(vertShip);
    expect(testBoard.shipTiles.get(41)).toBe(vertShip);
    expect(testBoard.shipTiles.get(34)).toBe(vertShip);
  });

  test('receiveAttack on an empty tile', () => {
    expect(testBoard.receiveAttack(3)).toBe(null);
    expect(testBoard.receiveAttack(17)).toBe(null);
    expect(testBoard.receiveAttack(47)).toBe(null);
  });

  test('receiveAttack on a ship', () => {
    expect(testBoard.receiveAttack(1)).toBe(horShip);
    expect(horShip.hitsTaken).toBe(1);
  });

  test('tracks all attacks', () => {
    const testAttacks = new Set([3, 17, 47, 1]);
    expect(testBoard.shotsReceived).toEqual(testAttacks);
  });

  test('shows that NOT all ships have sunk', () => {
    expect(testBoard.isAlive()).toBe(true);
  });

  test('shows that all ships have sunk', () => {
    testBoard.receiveAttack(0);
    testBoard.receiveAttack(48);
    testBoard.receiveAttack(41);
    testBoard.receiveAttack(34);
    console.log(testBoard.shipTiles.size);
    expect(testBoard.isAlive()).toBe(false);
  });

  test('place vertical ship off the top-side of grid', () => {
    expect(testBoard.placeVertical(54, createShip(2))).toBe(false);
  });

  test('place horizontal ship off the right-side of grid', () => {
    expect(testBoard.placeHorizontal(6, createShip(3))).toBe(false);
  });

  test('overlaps an already existing ship', () => {
    testBoard.placeHorizontal(0, createShip(2));
    expect(testBoard.placeHorizontal(1, createShip(2))).toBe(false);
  });
});
