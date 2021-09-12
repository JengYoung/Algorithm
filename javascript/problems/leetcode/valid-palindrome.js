/*
  s가 주어졌을 때, 최대 하나를 삭제한 후에 펠린드롬인지를 판별하세요.
 */

const validPalindrome = s => {
  return isPalindrome(s) ? true : false;
}

const isPalindrome = (s, prevFront, prevRear) => {
  let front = prevFront || 0;
  let rear = prevRear || s.length - 1;

  while (rear >= front) {
    if (s[front] !== s[rear]) {
      if (prevRear) return false;
      return isPalindrome(s, front + 1, rear) 
          || isPalindrome(s, front, rear - 1)
    };
    front += 1;
    rear -= 1;
  }
  
  return true;
}

(() => {
  const s = "abcba"
  console.log(validPalindrome(s))
})()