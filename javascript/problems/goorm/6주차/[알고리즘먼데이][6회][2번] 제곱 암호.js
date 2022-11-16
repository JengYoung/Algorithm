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

function main(p) {
  const N = p[0];
  const S = p[1];

  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  console.log(
    S.replace(
      /[a-z0-9]{2,2}/g,
      ([alphabet, num]) =>
        alphabets[(num ** 2 + alphabets.indexOf(alphabet)) % 26]
    )
  );
}
