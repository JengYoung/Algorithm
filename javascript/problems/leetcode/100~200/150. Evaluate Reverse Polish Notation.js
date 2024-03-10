/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const operators = {
    plus: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
  };

  const operatorSet = new Set(Object.values(operators));

  const passed = [];

  tokens.forEach((token) => {
    if (!operatorSet.has(token)) {
      passed.push(Number(token));
      return;
    }

    const second = passed.pop();
    const first = passed.pop();

    switch (token) {
      case operators.plus: {
        passed.push(first + second);
        return;
      }

      case operators.subtract: {
        passed.push(first - second);
        return;
      }

      case operators.multiply: {
        passed.push(first * second);
        return;
      }

      case operators.divide: {
        const result = first / second;
        passed.push(
          result >= 0 ? Math.floor(first / second) : Math.ceil(first / second)
        );
        return;
      }

      default: {
        return;
      }
    }
  });

  return passed[0];
};
