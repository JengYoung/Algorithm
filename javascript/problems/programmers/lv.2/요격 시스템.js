function solution(targets) {
  targets.sort((a, b) => {
    return a[1] - b[1];
  });

  let end = -1;

  let cnt = 0;
  targets.forEach((target) => {
    const [s, e] = target;
    if (s >= end) {
      end = e;
      cnt += 1;
    }
  });

  return cnt;
}
