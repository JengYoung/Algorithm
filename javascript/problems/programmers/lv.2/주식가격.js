function solution(prices) {
  const copiedPrices = [...prices];

  const result = new Array(copiedPrices.length).fill(0);

  const stack = [];

  let second = 0;

  stack.push({ value: copiedPrices.pop(), second });

  while (copiedPrices.length) {
    second += 1;

    const now = copiedPrices.pop();

    /** 만약 현재의 값이 스택의 마지막 값보다 크면 스택을 업데이트 해야 한다. */
    if (now > stack.at(-1).value) {
      result[copiedPrices.length] = 1;
      stack.push({ value: now, second });
      continue;
    }

    /** 만약 현재의 값이 스택의 마지막 값보다 작거나 같다면 스택을 최대한 빼놔야 한다. */
    while (stack.length && now <= stack[stack.length - 1].value) {
      stack.pop();
    }

    result[copiedPrices.length] = stack.length
      ? second - stack[stack.length - 1].second
      : second;

    stack.push({ value: now, second });
  }

  return result;
}

console.log(solution([1, 2, 3, 2, 3])); //[4, 3, 1, 1, 0]

console.log(solution([1, 4, 2, 3, 3, 1, 3])); // [6, 1, 3, 2, 1, 1, 0]
