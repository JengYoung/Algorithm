// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

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
  const [info, ...names] = inputs;

  /* eslint-disable-next-line */
  const [_, target] = info.split(' ');

  return names.filter((name) => name.includes(target)).length;
}
