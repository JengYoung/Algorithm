/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
  const BOARD_SIZE = 9;

  const rowSets = [...new Array(BOARD_SIZE)].map(() => new Set());
  const subSquareSets = [...new Array(BOARD_SIZE)].map(() => new Set());
  const colSets = [...new Array(BOARD_SIZE)].map(() => new Set());

  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const now = board[row][col];

      const rowSetsIndex = row;
      const colSetsIndex = col;
      const subSquareSetsIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

      if (now === '.') {
        continue;
      }

      const sets = [
        rowSets[rowSetsIndex],
        colSets[colSetsIndex],
        subSquareSets[subSquareSetsIndex],
      ];

      if (sets.some((s) => s.has(now))) {
        return false;
      }

      sets.forEach((s) => {
        s.add(now);
      });
    }
  }

  return true;
};
