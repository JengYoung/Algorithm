const getPalindromeLength = (str, leftStart, rightStart) => {
  let cnt = 0;

  let left = leftStart;
  let right = rightStart;

  while (left >= 0 && right < str.length) {
    const leftStr = str[left];
    const rightStr = str[right];

    if (leftStr !== rightStr) {
      break;
    }

    cnt += left === right ? 1 : 2;
    left -= 1;
    right += 1;
  }

  return cnt;
};

function solution(s) {
  let answer = 0;

  for (let start = 0; start < s.length; start += 1) {
    answer = Math.max(
      answer,
      getPalindromeLength(s, start, start),
      getPalindromeLength(s, start, start + 1)
    );
  }

  return answer;
}
