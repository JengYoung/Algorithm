// Run by Node.js
const readline = require('readline');

(async () => {
  const rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', function (line) {
    inputs.push(
      line
        .trim()
        .split(' ')
        .map((v) => +v)
    );
  }).on('close', function () {
    console.log(main(inputs));

    process.exit();
  });
})();

function main(inputs) {
  const [position, ...bombs] = inputs;
  /* eslint-disable-next-line */
  const [len, bombCnt] = position;

  const check = (x, y) => x >= 1 && x <= len && y >= 1 && y <= len;

  let result = 0;

  const Directions = [
    [0, 0],
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  bombs.forEach((v) => {
    const [x, y] = v;

    for (let [dx, dy] of Directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (check(nx, ny)) {
        result += 1;
      }
    }
  });

  return result;
}
