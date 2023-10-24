const L = {};

const curry =
  (f) =>
  (a, ..._) =>
    _.length ? f(a, ..._) : (...__) => f(a, ...__);

const reduce = curry(function reduce(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const a of iter) {
    acc = f(acc, a);
  }

  return acc;
});

const go = (...args) => reduce((acc, f) => f(acc), args);
const pipe =
  (f, ...fs) =>
  (...as) =>
    go(f(...as), ...fs);

const sortedArray = curry(function sortedArr(compareCallback, iter) {
  return [...iter].sort(compareCallback);
});

L.map = curry(function* map(f, iter) {
  for (const a of iter) {
    yield f(a);
  }
});

const take = curry((len, iter) => {
  const res = [];
  for (const a of iter) {
    res.push(a);

    if (res.length === len) return res;
  }

  return res;
});

const takeAll = take(Infinity);

const map = curry(pipe(L.map, takeAll));

function getTime(time) {
  return time
    .split(':')
    .reduce((acc, cur, idx) => (idx ? acc + +cur : acc + +cur * 60), 0);
}

const format = (plan) => [plan[0], getTime(plan[1]), Number(plan[2])];

function progress(prevResult, plan) {
  const { stack, result, lastAt } = prevResult;

  const nextResult = {
    stack: [...stack],
    result: [...result],
    lastAt,
  };

  while (nextResult.stack.length) {
    const prev = nextResult.stack.pop();

    const [prevSubject, prevStartAt, prevRemainTime] = prev;

    const diff = plan[1] - nextResult.lastAt;

    if (prevRemainTime <= diff) {
      nextResult.result.push(prevSubject);
      nextResult.lastAt += prevRemainTime;
    } else {
      nextResult.stack.push([prevSubject, prevStartAt, prevRemainTime - diff]);
      break;
    }
  }

  return {
    ...nextResult,
    stack: [...nextResult.stack, plan],
    lastAt: plan[1],
  };
}

function finishAssignment(plans) {
  return reduce(
    progress,
    {
      stack: [],
      result: [],
      lastAt: 0,
    },
    plans
  );
}

const reverseMap = curry(function reverse(f, iter) {
  const arr = [...iter];
  const len = arr.length;

  const res = [];

  for (let i = len - 1; i >= 0; i -= 1) {
    res.push(arr[i]);
  }

  return go(res, map(f));
});

const filterStack = pipe(
  reverseMap((v) => v[0]),
  takeAll
);

const merge = curry((...args) => {
  return reduce((acc, cur) => [...acc, ...cur], args);
});

function solution(plans) {
  const { stack, result } = go(
    plans,
    map(format),
    sortedArray((a, b) => a[1] - b[1]),
    finishAssignment
  );

  return merge(result, filterStack(stack));
}

(() => {
  console.log(
    solution([
      ['aaa', '12:00', '20'],
      ['bbb', '12:10', '30'],
      ['ccc', '12:40', '10'],
    ]) // bbb ccc aaa
  );
})();

console.log('===============================================================');

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

/**
 * ["science", "history", "computer", "music"]
 */
