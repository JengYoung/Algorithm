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

function main(arr) {
  const [n, scoresString] = arr;
  const scores = scoresString.split(' ');

  const scoreMap = new Map();
  for (let i = 0; i < n; i += 1) {
    const nowScore = +scores[i];
    const partnerScore = -nowScore;

    if (scoreMap.has(partnerScore)) {
      scoreMap.delete(partnerScore);
    } else {
      scoreMap.set(
        nowScore,
        scoreMap.has(nowScore) ? scoreMap.get(nowScore) : 0 + 1
      );
    }
  }

  const result = [...scoreMap].reduce(
    (acc, [key, value]) => acc + key * value,
    0
  );

  console.log(result);
}
