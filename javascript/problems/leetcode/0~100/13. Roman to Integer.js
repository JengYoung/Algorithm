const CompositeRomans = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

const Romans = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let result = 0;

  let i = 0;

  while (i < s.length) {
    const now = s[i];

    if (i + 1 < s.length) {
      const next = s[i + 1];
      const compositeRoman = now + next;

      if (compositeRoman in CompositeRomans) {
        result += CompositeRomans[compositeRoman];

        i += 2;
        continue;
      }
    }

    result += Romans[now];

    i += 1;
  }

  return result;
};
