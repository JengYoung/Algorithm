/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */

/*
    1. start를 기준으로 해서 일단 정렬을 시킨다.
    2. 그럼 쭉 일자로 될터인데, 결국 이것이 합쳐지려면 뒤의 start가 end보다 작아야 한다.
    3. 이 역시 스택에 넣다가, 조건이 충족되지 않으면 스택에 있는 것을 빼내서, 이를 조건에 맞게 다시 넣어준다.
*/
const merge = (intervals) => {
  const stack = [];
  intervals
    .sort((a, b) => a[0] - b[0])
    .map(([start, end]) => {
      if (!stack.length || stack[stack.length - 1][1] < start) {
        stack.push([start, end]);
      } else {
        const [prevStart, prevEnd] = stack.pop();
        stack.push([Math.min(prevStart, start), Math.max(prevEnd, end)]);
      }
    });
  return stack;
};
