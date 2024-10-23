/**
 * [x] 스택을 이용한다. 결국 가장 최근의 가격을 기준으로, 이전의 가격들을 비교하면 되는 문제이다.
 * [x] 스택은 결국 자신보다 큰 주식가격을 순서대로 비교할 수 있어야 한다. 이를 위해 단조스택을 유지하면서, 자신보다 큰 값이 있다면 빼고 아니라면 자신을 추가한다. 이때, 값과 현재의 인덱스 값을 알려주어 초를 계산할 수 있도록 한다.
 * [x] 반복하며 초를 계산한다.
 * [x] 결과를 반환한다.
 */

class Stack {
  constructor(arr = []) {
    this.arr = [...arr];
  }

  isEmpty() {
    return !this.arr.length;
  }

  push(value) {
    return this.arr.push(value);
  }

  pop() {
    return this.arr.pop();
  }

  get top() {
    return this.arr[this.arr.length - 1];
  }

  get length() {
    return this.arr.length;
  }
}

function solution(prices) {
  // [x] 두 개의 스택을 이용한다. 결국 가장 최근의 가격을 기준으로, 이전의 가격들을 비교하면 되는 문제이다.
  const prevStack = new Stack();
  const pricesStack = new Stack(
    prices.map((value, index) => ({ time: index + 1, value: value }))
  );

  const result = new Array(prices.length).fill(0);

  const totalTime = prices.length;

  // [x] 반복하며 초를 계산한다.
  while (!pricesStack.isEmpty()) {
    const now = pricesStack.pop();

    // [x] 스택은 결국 자신보다 큰 주식가격을 순서대로 비교할 수 있어야 한다. 이를 위해 단조스택을 유지하면서, 자신보다 큰 값이 있다면 빼고 아니라면 자신을 추가한다. 이때, 값과 현재의 인덱스 값을 알려주어 초를 계산할 수 있도록 한다.
    while (!prevStack.isEmpty() && now.value <= prevStack.top.value) {
      prevStack.pop();
    }

    result[pricesStack.length] = (prevStack.top?.time ?? totalTime) - now.time;

    prevStack.push(now);
  }

  // [x] 결과를 반환한다.
  return result;
}

console.log(solution([1, 2, 3, 2, 3])); //[4, 3, 1, 1, 0]

console.log(solution([1, 4, 2, 3, 3, 1, 3])); // [6, 1, 3, 2, 1, 1, 0]
