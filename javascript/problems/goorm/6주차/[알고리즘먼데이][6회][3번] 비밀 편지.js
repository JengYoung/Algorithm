// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];
  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(inputs);
  });
})();

function* getInput(ips) {
  let i = 0;
  let T = +ips[0];

  while (i !== T) {
    yield [ips[i * 2 + 1], ...ips[i * 2 + 2].split(' ')];
    i += 1;
  }
  return;
}

const calc = (now, sft, type) => {
  const ALPHA_LENGTH = 26;

  const UPPER_START_CODE = 65;
  const LOWER_START_CODE = 97;

  const typeWeight = {
    E: 1,
    D: -1,
  };

  const nowWeight =
    now >= LOWER_START_CODE ? LOWER_START_CODE : UPPER_START_CODE;

  const resNow = now - nowWeight;
  const resSft =
    (ALPHA_LENGTH + typeWeight[type] * (sft % ALPHA_LENGTH)) % ALPHA_LENGTH;

  return ((ALPHA_LENGTH + resNow + resSft) % ALPHA_LENGTH) + nowWeight;
};

function main(ips, exit) {
  const gen = getInput(ips);

  for (let [S, type, token] of gen) {
    const repeatedToken = token.padEnd(S.length, token).slice(0, S.length);

    const result = S.replace(/[a-zA-Z]/g, (s, idx) =>
      String.fromCharCode(
        calc(s.charCodeAt(), repeatedToken[idx].charCodeAt(), type)
      )
    );

    console.log(result);
  }
}
