// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const inputs = [];

  await rl
    .on('line', function (line) {
      inputs.push(line);
    })
    .on('close', function () {
      console.log(main(inputs));

      process.exit();
    });
})();

function main(inputs) {
  let result = BigInt(1);

  const [num, bridgesStr] = inputs;
  const bridges = bridgesStr.split(' ');

  for (let i = 0; i < num; i += 1) {
    const nowBridge = Number(bridges[i]);
    result *= BigInt(nowBridge);
  }

  return result.toString();
}
