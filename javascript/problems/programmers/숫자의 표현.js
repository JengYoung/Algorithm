const n = 15;

function solution(n) {
  let cnt = 0;
  let now = 0;
  let [ start, end ] = [ 1, 1 ];
  while (start <= n) {
    while (now < n && end <= n) {
      now += end;
      end++;
    }
    if (now === n) cnt++;
    now -= start++;
  }
  return cnt;
}

console.log(solution(n))