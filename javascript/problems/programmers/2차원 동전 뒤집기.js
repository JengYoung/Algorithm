const getCopiedBoard = (board) => {
  return JSON.parse(JSON.stringify(board));
};

function reverseColumn(board, idx) {
  for (let i = 0; i < board.length; i += 1) {
    board[i][idx] = +!board[i][idx];
  }
}

function deepEqual(target, board) {
  return JSON.stringify(target) === JSON.stringify(board);
}

function check(board, target, col) {
  let flag = false;

  for (let row = 0; row < board.length; row += 1) {
    if (board[row][col] !== target[row][col]) {
      flag = true;

      break;
    }
  }

  return flag;
}

const solution = (beginning, target) => {
  let result = Infinity;

  const rowLength = beginning.length;
  const colLength = beginning[0].length;

  const rowCases = 1 << rowLength; // 0이면 뒤집지 말고, 1이면 뒤집어라!

  for (let bit = 0; bit < rowCases; bit += 1) {
    let reverseCount = 0;

    const board = getCopiedBoard(beginning);

    for (let row = 0; row < rowLength; row += 1) {
      const nowRowBit = 1 << row;

      if (!(nowRowBit & bit)) {
        board[row] = board[row].map((v) => +!v);
        reverseCount += 1;
      }
    }

    for (let col = 0; col < colLength; col += 1) {
      const shouldReverse = check(board, target, col);

      if (shouldReverse) {
        reverseColumn(board, col);
        reverseCount += 1;
      }
    }

    if (deepEqual(target, board)) {
      result = Math.min(result, reverseCount);
    }
  }

  return result === Infinity ? -1 : result;
};

console.log(
  solution(
    [
      [0, 1, 0, 0, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ],
    [
      [0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1],
      [0, 0, 1, 0, 1],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1],
    ]
  )
);

console.log(
  solution(
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [1, 0, 1],
      [0, 0, 0],
      [0, 0, 0],
    ]
  )
);
