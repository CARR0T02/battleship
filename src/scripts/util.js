export const randomIndex = function (boardSize) {
  return Math.floor(Math.random() * boardSize ** 2);
};

export const isValidMove = (index, oppBoard) => {
  if (
    oppBoard.shotsReceived.has(index) ||
    index < 0 ||
    index >= oppBoard.size ** 2
  ) {
    return false;
  }
  return true;
};
