// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(inputs);
    process.exit();
  });
})();

function main(ips) {
  const [N, K] = ips[0].split(' ').map(Number);
  const BOARD_LENGTH = 1002;
  const board = Array.from({ length: BOARD_LENGTH }, () =>
    new Array(BOARD_LENGTH).fill(0)
  );

  for (let i = 0; i < N; i += 1) {
    const [x1, y1, x2, y2] = ips[i + 1].split(' ').map(Number);
    board[x1][y1] += 1;
    board[x2][y2] += 1;
    board[x2][y1] -= 1;
    board[x1][y2] -= 1;
  }

  for (let x = 0; x < BOARD_LENGTH - 1; x += 1) {
    for (let y = 0; y < BOARD_LENGTH - 1; y += 1) {
      board[x][y + 1] += board[x][y];
    }
  }

  for (let x = 0; x < BOARD_LENGTH - 1; x += 1) {
    for (let y = 0; y < BOARD_LENGTH - 1; y += 1) {
      board[x + 1][y] += board[x][y];
    }
  }

  console.log(board.flat().filter((v) => v === K).length);
}
