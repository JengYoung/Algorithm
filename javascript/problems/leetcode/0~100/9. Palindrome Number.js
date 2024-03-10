/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const strX = x.toString();

  let left = 0;
  let right = strX.length - 1;

  let flag = true;

  while (left <= right) {
    if (strX[left] !== strX[right]) {
      flag = false;
      break;
    }

    left += 1;
    right -= 1;
  }

  return flag;
};
