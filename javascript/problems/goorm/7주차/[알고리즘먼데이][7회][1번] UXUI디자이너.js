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

function main(inputs) {
  const [N, M] = inputs[0].split(' ').map(Number);
  const evts = new Array(N + 1).fill(0);

  for (let i = 1; i < M + 1; i += 1) {
    const now = inputs[i].split(' ').slice(1).map(Number);
    now.forEach((v) => (evts[v] += 1));
  }

  const maxValue = Math.max(...evts);

  const results = [];
  evts.forEach((v, idx) => {
    if (v === maxValue) results.unshift(idx);
  });

  console.log(results.join(' '));
}
