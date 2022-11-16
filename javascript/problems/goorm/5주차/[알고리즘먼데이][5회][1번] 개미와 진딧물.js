// Run by Node.js
const readline = require('readline');

const main = (ips, exit) => {
  const [N, M] = ips[0].split(' ').map(Number);
  const board = [];

  for (let i = 1; i < ips.length; i += 1) {
    board.push(ips[i].split(' ').map(Number));
  }

  const rowLength = board.length;
  const colLength = board[0].length;

  const ants = [];
  const aphids = [];

  for (let row = 0; row < rowLength; row += 1) {
    for (let col = 0; col < colLength; col += 1) {
      const now = board[row][col];

      if (now === 1) {
        ants.push([row, col]);
      } else if (now === 2) {
        aphids.push([row, col]);
      }
    }
  }

  let result = 0;
  ants.forEach(([r, c]) => {
    result += +!!aphids.filter(
      ([ar, ac]) => Math.abs(ar - r) + Math.abs(ac - c) <= M
    ).length;
  });

  console.log(result);
  exit();
};

(async () => {
  let rl = readline.createInterface({ input: process.stdin });
  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim())).on('close', () =>
    main(inputs, process.exit)
  );
})();
