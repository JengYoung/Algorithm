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

const permute = (nums) => {
  const result = [];
  if (nums.length === 1) return [nums];

  nums.forEach((head, idx) => {
    permute(nums.filter((_, tailIdx) => tailIdx !== idx)).forEach(
      (permutedTail) => {
        result.push([head, ...permutedTail]);
      }
    );
  });

  return result;
};

function main(p) {
  let result = Infinity;

  const N = p[0];
  const numbers = p[1].split(' ');

  const permutations = permute(numbers);

  permutations.forEach((arr) => {
    let res = '';
    arr.forEach(
      (num) =>
        (res += num[0] === res[res.length - 1] ? num[num.length - 1] : num)
    );
    result = Math.min(+res, +result);
  });

  console.log(result);
}
