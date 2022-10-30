// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim())).on('close', () => {
    main(inputs);

    process.exit();
  });
})();

function main(inputs) {
  const N = inputs[0];
  let mapleStoryMap = Array.from({ length: N }, (_, idx) =>
    inputs[idx + 1].split(' ').map(Number)
  );
  if (mapleStoryMap.flat().every((v) => !v)) {
    console.log(0);
    return;
  }

  const Directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const check = (x, y) => x >= 0 && y >= 0 && x < N && y < N;

  let result = 0;

  let 단풍이피지않았습니다_아직은가을이아니에오 = true;
  while (단풍이피지않았습니다_아직은가을이아니에오) {
    result += 1;

    const copyMap = JSON.parse(JSON.stringify(mapleStoryMap));

    for (let x = 0; x < N; x += 1) {
      for (let y = 0; y < N; y += 1) {
        const now = mapleStoryMap[x][y];

        if (now === 0) {
          for (let [dx, dy] of Directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (check(nx, ny) && copyMap[nx][ny]) {
              copyMap[nx][ny] -= 1;
            }
          }
        }
      }
    }

    mapleStoryMap = copyMap;
    if (copyMap.flat().every((v) => !v))
      단풍이피지않았습니다_아직은가을이아니에오 = false;
  }

  console.log(result);
}
