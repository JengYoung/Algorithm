/**
 * @param {number[]} changed
 * @return {number[]}
 */
var findOriginalArray = function (changed) {
  const changedLength = changed.length;
  if (changedLength % 2) return [];

  const answer = [];
  const obj = {};

  for (let i = 0; i < changed.length; i += 1) {
    const now = changed[i];
    obj[now] = (obj[now] ?? 0) + 1;
  }

  for (let key in obj) {
    if (obj[key] === 0) continue;
    if (!obj[key * 2]) return [];
    if (key === "0") {
      if (obj[key] % 2) return [];
      for (let i = 0; i < obj[key] / 2; i += 1) {
        answer.push(0);
      }
      continue;
    }

    const cnt = obj[key];
    for (let i = 0; i < cnt; i += 1) {
      answer.push(key);
    }

    obj[key] = 0;
    obj[key * 2] -= cnt;
  }

  return answer;
};

const changed = [0, 0, 0, 0];
console.log(findOriginalArray(changed));
