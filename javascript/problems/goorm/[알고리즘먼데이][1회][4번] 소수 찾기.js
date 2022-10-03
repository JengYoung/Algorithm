// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];
  rl.on('line', function (line) {
    inputs.push(line);
  }).on('close', function () {
    console.log(main(inputs));

    process.exit();
  });
})();

function main(inputs) {
  const [len, numbersStr] = inputs;
  const numbers = numbersStr.split(' ').map((v) => Number(v));

  let result = 0;

  for (let i = 1; i < len; i += 1) {
    const now = i + 1;

    let flag = false;
    if (now === 2) {
      result += numbers[i];
      continue;
    }

    for (let j = 2; j <= Math.sqrt(now, 2); j += 1) {
      if (flag) continue;
      if (now % j === 0) {
        flag = true;
      }
    }

    if (!flag) result += numbers[i];
  }

  return result;
}
