/*
 * 1. twoPointer을 써보면 어떨까?
 * 2. 만약에 얘가 중복된 문자가 생긴다면, 얘를 취소.
 * 3. 중복된 문자의 기준: 현재의 문자를 객체에 담으면 어떨까?
 * 4. 객체에서 계속해서 위치를 업데이트한다 -> 그러면 인덱스를 찾을 필요가 없음.
 * 5. 만약 중복되는 게 있었다면 다시 시작, 아니면 cnt를 업데이트.
 */
const lengthOfLongestSubstring = (s) => {
  let maxCnt = 0;
  let cnt = 0;
  const lastIndices = {};
  s.split('').forEach((char, idx) => {
    console.log(lastIndices, char, cnt);
    if (!lastIndices.hasOwnProperty(char) || lastIndices[char] < idx - cnt) {
      // idx - cnt : 현재 찾는 길이의 첫 번째 문자 인덱스 위치.
      cnt += 1;
      maxCnt = Math.max(maxCnt, cnt);
    } else {
      cnt = idx - lastIndices[char];
    }
    lastIndices[char] = idx;
  });
  return maxCnt;
};

const s = 'dvdf';
console.log(lengthOfLongestSubstring(s));

// NOTE 2년 후의 코드 변화... 많이 깔끔해졌네.
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let result = 0;

  let left = 0;
  let right = 0;

  const set = new Set();

  while (left <= right && right < s.length) {
    const now = s[right];

    while (set.has(now)) {
      set.delete(s[left]);
      left += 1;
    }

    set.add(now);

    right += 1;

    if (result < set.size) {
      result = set.size;
    }
  }

  return result;
};
