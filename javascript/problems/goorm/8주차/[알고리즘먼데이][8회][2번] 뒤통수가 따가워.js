// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line)).on('close', () => {
    main(+inputs[0], inputs[1].trim().split(' ').map(Number));
  });
})();

function main(N, arr) {
  let resultArr = new Array(N).fill(0);

  const stack = [];

  arr.forEach((v, idx) => {
    if (!idx) return stack.push(v);

    resultArr[idx] = stack.length;

    while (stack[stack.length - 1] <= v) {
      stack.pop();
    }

    stack.push(v);
  });

  console.log(resultArr.join(' '));
}
