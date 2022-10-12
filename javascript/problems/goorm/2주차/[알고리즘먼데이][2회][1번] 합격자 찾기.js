// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', function (line) {
    inputs.push(line.trim());
  }).on('close', function () {
    main(inputs);
    process.exit();
  });
})();

function main(inputs) {
  const [n, ...infos] = inputs;
  for (let i = 0; i < n; i += 1) {
    const num = Number(infos[i * 2]);
    const results = infos[i * 2 + 1].split(' ').map((v) => Number(v));

    const total = results.reduce((acc, cur) => acc + cur, 0);
    const average = total / num;

    console.log(`${results.filter((v) => v >= average).length}/${num}`);
  }
}
