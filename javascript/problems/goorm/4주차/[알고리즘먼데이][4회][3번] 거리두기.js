// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', (line) => inputs.push(line.trim())).on('close', () => {
    main(inputs);

    process.exit();
  });
})();

function main() {}
