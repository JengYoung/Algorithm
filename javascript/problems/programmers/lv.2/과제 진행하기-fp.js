class ArrayFilter {
  static of(value) {
    if (!Array.isArray(value)) {
      return null;
    }

    return new ArrayFilter(value);
  }

  static splitStringToArray(value, separator) {
    if (['RegExp', 'String'].includes(separator?.constructor?.name)) {
      return ArrayFilter.of(value.split(separator));
    }
  }

  constructor(value) {
    this._value = value;
  }

  get numeric() {
    return ArrayFilter.of(this._value).map((v) => (/^[\d]$/.test(v) ? +v : v));
  }

  get value() {
    return this._value;
  }

  map(func) {
    return ArrayFilter.of(this._value.map(func));
  }

  slice(from, to) {
    return ArrayFilter.of(this._value.slice(from, to));
  }

  concat(arr) {
    return ArrayFilter.of(this._value.concat(arr));
  }

  sort(sortStrategyFunc) {
    return ArrayFilter.of(this._value.sort(sortStrategyFunc));
  }

  reverse() {
    return ArrayFilter.of(this._value.reverse());
  }

  reduce(func, initialValue) {
    const result = this._value.reduce(func, initialValue);

    if (ArrayFilter.of(result) === null) {
      return result;
    }

    return ArrayFilter.of(result);
  }

  merge(item) {
    return ArrayFilter.of([...this._value, item]);
  }

  removeLast() {
    return ArrayFilter.of(ArrayFilter.of(this._value).slice(0, -1));
  }
}

const iterWithHeadMultiply = (value) => (acc, cur, index) =>
  acc + (!index ? value * +cur : +cur);

const getTime = (time) => {
  return ArrayFilter.splitStringToArray(time, ':').numeric.reduce(
    iterWithHeadMultiply(60),
    0
  );
};

const compareValueByIndex = (index) => (a, b) => a[index] - b[index];

const getSortedPlans = (plans) => {
  return ArrayFilter.of(plans)
    .map(([name, time, period]) => [name, getTime(time), +period])
    .sort(compareValueByIndex(1)).value;
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
  return flag ? ArrayFilter.of(result).merge(name).value : result;
};

const getNextStack = (stack, flag, item) => {
  return ArrayFilter.of(stack)
    .slice(0, -1)
    .concat(flag ? [item] : []).value;
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
    return ArrayFilter.of(result).concat(
      ArrayFilter.of(stack)
        .reverse()
        .map((v) => v[0]).value
    ).value;
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
