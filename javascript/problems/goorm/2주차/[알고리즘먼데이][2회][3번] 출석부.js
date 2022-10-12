// Run by Node.js
const readline = require('readline');

(async () => {
  let rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', function (line) {
    inputs.push(line.trim());
  }).on('close', function () {
    console.log(main(...inputs));
    process.exit();
  });
})();

function main(position, ...infos) {
  const [peopleCnt, targetIndex] = position.split(' ');
  return [...infos]
    .map((v) => v.split(' '))
    .sort(([aName, aHeight], [bName, bHeight]) => {
      if (aName < bName) return -1;
      else if (aName > bName) return 1;
      else {
        return +aHeight - +bHeight;
      }
    })
    [targetIndex - 1].join(' ');
}
