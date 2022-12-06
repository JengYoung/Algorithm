// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(+inputs[0], inputs[1]);
    process.exit();
  });
})();

function main(N, S) {
  let result = '';
  const goormNums = {
    qw: 1,
    as: 2,
    zx: 3,
    we: 4,
    sd: 5,
    xc: 6,
    er: 7,
    df: 8,
    cv: 9,
    ze: 0,
  };

  for (let i = 0; i < N - 1; i += 1) {
    const now = S[i] + S[i + 1];

    if (now in goormNums) {
      result += goormNums[now];
    }
  }

  console.log(result);
}
