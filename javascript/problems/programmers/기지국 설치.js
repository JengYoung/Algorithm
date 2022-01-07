function solution(n, stations, w) {
  const arr = [];
  let prev = 1;
  let next;
  stations.forEach((station) => {
    const now = station - w;
    if (prev < now) {
      arr.push([prev, now - 1]);
    }
    next = station + w;
    prev = next + 1;
  });
  if (prev <= n) {
    arr.push([prev, n]);
  }

  let cnt = 0;
  for (const [start, end] of arr) {
    if (!(end - start)) {
      cnt += 1;
      continue;
    }
    cnt += Math.ceil((end - start + 1) / (w * 2 + 1));
  }
  return cnt;
}
