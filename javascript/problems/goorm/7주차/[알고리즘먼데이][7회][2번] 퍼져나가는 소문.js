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

const findParent = (parent, x) =>
  parent[x] === x ? x : findParent(parent, parent[x]);

const updateParent = (parent, a, b) => {
  const parentA = findParent(parent, a);
  const parentB = findParent(parent, b);
  if (parentA < parentB) parent[parentB] = parent[parentA];
  else if (parentB < parentA) parent[parentA] = parent[parentB];
};

function main(inputs) {
  const N = +inputs[0];
  const M = +inputs[1];

  const parents = Array.from({ length: N + 1 }, (_, idx) => idx);

  for (let i = 2; i < M + 2; i += 1) {
    const [a, b] = inputs[i].split(' ').map(Number);

    updateParent(parents, a, b);
  }

  const networkStandard = 1;

  console.log(
    parents.filter((v) => findParent(parents, v) === networkStandard).length
  );
}
