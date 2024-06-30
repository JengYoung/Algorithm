/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  const getIndex = (s, index) => {
    let backspaceCount = 0;
    let i = index;

    while (i >= 0) {
      if (s[i] === '#') {
        backspaceCount += 1;
        i -= 1;
      } else if (backspaceCount > 0) {
        backspaceCount -= 1;
        i -= 1;
      } else {
        break;
      }
    }

    return i;
  };

  let endS = s.length - 1;
  let endT = t.length - 1;

  let flag = true;

  while (endS >= 0 || endT >= 0) {
    endS = getIndex(s, endS);
    endT = getIndex(t, endT);

    if (endS < 0 && endT < 0) {
      break;
    }

    if (endS < 0 || endT < 0) {
      flag = false;
      break;
    }

    if (s[endS] !== t[endT]) {
      flag = false;
      break;
    }

    endS -= 1;
    endT -= 1;
  }

  return flag;
};
