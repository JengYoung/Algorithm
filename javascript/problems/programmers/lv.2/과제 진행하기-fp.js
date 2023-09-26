class ArrayFilter {
  static of(value) {
    if (!Array.isArray(value)) {
      return null;
    }

    return new ArrayFilter(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(func) {
    return ArrayFilter.of(this._value.map(func));
  }

  sort(sortStrategyFunc) {
    return ArrayFilter.of(this._value.sort(sortStrategyFunc));
  }

  reverse() {
    return ArrayFilter.of(this._value.reverse());
  }
}

console.log(ArrayFilter.of([1, 2, 3]).map((v) => v + 2));

const getTime = (time) => {
  return time
    .split(':')
    .reduce((acc, cur, index) => acc + (!index ? 60 * +cur : +cur), 0);
};

const compareValueByIndex = (index) => (a, b) => a[index] - b[index];

const getSortedPlans = (plans) => {
  return plans
    .map(([name, time, period]) => [name, getTime(time), +period])
    .sort(compareValueByIndex(1));
};

const isNoLength = (arr) => !arr.length;

const getArrangedProgress = (
  result,
  stack,
  breakTime,
  getNextResult,
  getNextStack
) => {
  if (isNoLength(stack)) {
    return { result, stack };
  }

  const lastItem = stack.at(-1);

  const [nowName, nowTime, nowPeriod] = lastItem;

  const remainTime = nowPeriod - breakTime;

  const nextResult = getNextResult(result, remainTime <= 0, nowName);
  const nextStack = getNextStack(stack, remainTime > 0, [
    nowName,
    nowTime,
    remainTime,
  ]);

  if (remainTime > 0) {
    return { breakTime: breakTime - nowPeriod, result, stack: nextStack };
  }

  return getArrangedProgress(
    nextResult,
    nextStack,
    breakTime - nowPeriod,
    getNextResult,
    getNextStack
  );
};

const getNextResult = (result, flag, name) => {
  return flag ? [...result, name] : result;
};

const getNextStack = (stack, flag, item) => {
  return stack.slice(0, -1).concat(flag ? [item] : []);
};

const progress = (
  sortedPlans,
  index,
  result,
  stack,
  getNextResult,
  getNextStack
) => {
  if (index === sortedPlans.length) {
    return result.concat([...stack].reverse().map((v) => v[0]));
  }

  const breakTime =
    index > 0 ? sortedPlans[index][1] - sortedPlans[index - 1][1] : 0;

  const { result: nextResult, stack: nextStack } = getArrangedProgress(
    result,
    stack,
    breakTime,
    getNextResult,
    getNextStack
  );

  return progress(
    sortedPlans,
    index + 1,
    nextResult,
    [...nextStack, sortedPlans[index]],
    getNextResult,
    getNextStack
  );
};

function solution(plans) {
  return progress(
    getSortedPlans(plans),
    0,
    [],
    [],
    getNextResult,
    getNextStack
  );
}

(() => {
  console.log(
    solution([
      ['korean', '11:40', '30'],
      ['english', '12:10', '20'],
      ['math', '12:30', '40'],
    ])
  );
})();

(() => {
  console.log(
    solution([
      ['science', '12:40', '50'],
      ['music', '12:20', '40'],
      ['history', '14:00', '30'],
      ['computer', '12:30', '100'],
    ])
  );
})();

(() => {
  console.log(
    solution([
      ['aaa', '12:00', '20'],
      ['bbb', '12:10', '30'],
      ['ccc', '12:40', '10'],
    ])
  );
})();
