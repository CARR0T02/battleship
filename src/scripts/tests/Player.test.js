import Gameboard from '../Gameboard';
import Player from '../Player';

describe('Player', () => {
  const testPlayer = Player();
  const mockOppBoard = Gameboard();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('submits an attack', () => {
    const spy = jest.spyOn(mockOppBoard, 'receiveAttack');
    expect(testPlayer.attack(0, mockOppBoard)).toBe(null);
    expect(spy).toHaveBeenCalledWith(0);
  });

  test('submits an invalid attack', () => {
    expect(testPlayer.attack(-1, mockOppBoard)).toBe(false);
  });

  test('submits an attack already played before', () => {
    expect(testPlayer.attack(0, mockOppBoard)).toBe(false);
  });

  test('AI randomly attacks', () => {
    expect(testPlayer.attackRandom(mockOppBoard)).toBe(null);
  });
});
