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
  const phoneKeyboard = [
    null,
    '1.,?!',
    '2ABC',
    '3DEF',
    '4GHI',
    '5JKL',
    '6MNO',
    '7PQRS',
    '8TUV',
    '9WXYZ',
  ];

  let result = '';

  const [n, numbers] = inputs;

  let prev = '';
  let cnt = 0;

  for (let i = 0; i < n; i += 1) {
    const now = numbers[i];

    if (now === prev) {
      cnt += 1;
    } else {
      if (prev) {
        const phoneKey = phoneKeyboard[prev];
        result += phoneKey[(cnt - 1) % phoneKey.length];
      }

      cnt = 1;
      prev = now;
    }
  }

  console.log(
    result +
      (prev ? phoneKeyboard[prev][(cnt - 1) % phoneKeyboard[prev].length] : '')
  );
}
