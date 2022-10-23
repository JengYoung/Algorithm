// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  for await (const str of rl) {
    console.log(main(str));
    rl.close();
  }

  process.exit();
})();

function main(str) {
  let arr = str
    .trim()
    .split(' ')
    .map((p) => Number(p));
  arr.sort((a, b) => b - a);

  return Math.abs(arr[0] - arr[3]) + Math.abs(arr[1] - arr[2]);
}
