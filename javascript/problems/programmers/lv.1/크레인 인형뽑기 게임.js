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

/**
 * [x] 주어진 배열의 크기가 작은 만큼, 각 열을 스택으로 묶어버린다. 또한, 옮긴 결과를 저장하는 스택을 별도로 생상한다.
 * [x] 스택으로 변환된 2차월 배열에서 계속해서 크레인을 움직이면서, 결과 스택을 업데이트한다.
 * [x] 결과를 반환한다.
 */

const solution = (board, moves) => {
  let count = 0;

  // [x] 주어진 배열의 크기가 작은 만큼, 각 열을 스택으로 묶어버린다. 또한, 옮긴 결과를 저장하는 스택을 별도로 생상한다.
  const resultStack = new Stack([]);

  const stacks = Array.from({ length: board.length + 1 }, () => new Stack());

  for (let i = board.length - 1; i >= 0; i -= 1) {
    for (let j = 0; j < board.length; j += 1) {
      const now = board[i][j];
      if (now) {
        stacks[j + 1].push(now);
      }
    }
  }

  // [x] 스택으로 변환된 2차월 배열에서 계속해서 크레인을 움직이면서, 결과 스택을 업데이트한다.
  moves.forEach((position) => {
    const now = stacks[position].pop();

    if (!now) {
      return;
    }

    if (resultStack.top === now) {
      resultStack.pop();
      count += 2;

      return;
    }

    resultStack.push(now);
  });

  // [x] 결과를 반환한다.
  return count;
};

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4]
  )
);
