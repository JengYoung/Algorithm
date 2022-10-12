// Run by Node.js
const readline = require('readline');

(async () => {
  const rl = readline.createInterface({ input: process.stdin });

  const inputs = [];

  rl.on('line', function (line) {
    inputs.push(line);
  }).on('close', function () {
    console.log(main(...inputs));
    process.exit();
  });
})();

function main(n, s) {
  return s.match(
    new RegExp(
      Array.from(
        { length: 'z'.charCodeAt() - 'a'.charCodeAt() + 1 },
        (_, idx) => idx + 'a'.charCodeAt()
      )
        .map((v) => `${String.fromCharCode(v)}+`)
        .join('|'),
      'g'
    )
  ).length;
}
