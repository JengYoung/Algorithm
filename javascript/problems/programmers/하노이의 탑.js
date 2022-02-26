const hanoi = (n, from, to, dropBy, res = []) => {
  if (n === 1) {
    res.push([from, to]);
    return res;
  }
  res = hanoi(n - 1, from, dropBy, to, res);
  res.push([from, to]);
  res = hanoi(n - 1, dropBy, to, from, res);
  return res;
};

function solution(n) {
  const answer = hanoi(n, 1, 3, 2, []);
  return answer;
}
