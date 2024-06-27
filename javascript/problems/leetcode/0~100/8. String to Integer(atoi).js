class Formatter {
  constructor(s) {
    const trimedStrings = s.trim();

    this.signedness = trimedStrings.startsWith('-') ? '-' : '+';

    this.values = trimedStrings.replace(/^[+-]/, '');
  }

  trim(s) {
    return s.trim().split(' ')[0];
  }

  round(s) {
    const NAGATIVE_MAX = (-2) ** 31;

    const POSITIVE_MAX = 2 ** 31 - 1;

    if (+s < NAGATIVE_MAX) {
      return NAGATIVE_MAX;
    }

    if (+s >= POSITIVE_MAX) {
      return POSITIVE_MAX;
    }

    return s;
  }

  getNumber(s) {
    const matches = s.match(/^[0-9]+([.][0-9])?/);

    return Number(matches ? this.signedness + matches[0] : '0');
  }

  format() {
    return this.round(this.getNumber(this.values));
  }
}

/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const result = new Formatter(s).format();

  return result;
};
