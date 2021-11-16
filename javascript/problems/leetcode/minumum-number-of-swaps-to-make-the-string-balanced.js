/*
  가장 최선일 때의 바꾸기: 
    - 왼쪽에서 뭔가 균형이 잡히지 않을 때 (특히 닫는 괄호가 많을 때)
    - 오른쪽의 여는 괄호가 가장 마지막일 때.
*/
const minSwaps = (s) => {
  let cnt = 0;
  let start = 0;
  let end = s.length - 1;
  let left = 0;
  let right = 0;

  while (start < end) {
    console.log(cnt, start, end, left, right);
    updateCount(s[start]);
    if (right > left) {
      while (left !== right) {
        updateCount(s[end]);
        end -= 1;
      }
      right -= 1;
      cnt += 1;
    }
    start += 1;
  }

  return cnt;

  function updateCount(value) {
    if (value === "[") left += 1;
    else right += 1;
  }
};

const s = "]]][[[";
console.log(minSwaps(s));
