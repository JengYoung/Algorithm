/**
 * @param {number} n
 * @param {number} k
 * @return {number[]}
 */
const numsSameConsecDiff = (n, k) => {
  const arr = [];
  const dfs = (val) => {
    if (val.length === n) return arr.push(val);

    const lastNumber = +val[val.length - 1];
    const diffSet = new Set([lastNumber - k, lastNumber + k]);

    diffSet.forEach((diff) => {
      if (diff >= 0 && diff < 10) dfs(`${val}${diff}`);
    });
  };

  for (let i = 1; i < 10; i += 1) {
    dfs(`${i}`);
  }
  return arr;
};

console.log(numsSameConsecDiff(2, 1));
