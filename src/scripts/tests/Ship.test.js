import createShip from '../Ship';

describe('Ship', () => {
  test('invalid length given', () => {
    expect(() => {
      createShip(-1);
    }).toThrow();
  });

  const testShip = createShip(2);
  test('creates correct length', () => {
    expect(testShip.length).toBe(2);
  });

  test('is not sunk after 1 hit', () => {
    testShip.hit();
    expect(testShip.isSunk()).toBeFalsy();
  });

  test('is sunk after 2 hits', () => {
    testShip.hit();
    expect(testShip.isSunk()).toBeTruthy();
  });

  test('throws an error if trying to hit a sunk ship', () => {
    expect(() => {
      testShip.hit();
    }).toThrow();
  });
});
