const getMin = (origin) => {
  return origin.length ? Math.min(...origin) : null;
}
const getMax = (origin) => {
  return origin.length ? Math.max(...origin) : null;
}

// const solution = (A, B) => {
//   let result = 0;
//   while (A.length) {
//     const AMax = getMax(A);
//     const AMin = getMin(A);
//     const BMax = getMax(B);
//     const BMin = getMin(B);
//     const AMaxBMinMul = AMax * BMin;
//     const BMaxAMinMul = BMax * AMin;
//     if (AMaxBMinMul <= BMaxAMinMul) {
//       result += AMaxBMinMul;
//       A.splice(A.indexOf(AMax), 1);
//       B.splice(B.indexOf(BMin), 1);
//     } else {
//       result += BMaxAMinMul;
//       A.splice(A.indexOf(AMin), 1);
//       B.splice(B.indexOf(BMax), 1);
//     }
//   }
//   return result;
// }

const solution = (A, B) => {
  let result = 0;
  let sortedA = A.sort((a, b) => a - b);
  let sortedB = B.sort((a, b) => b - a);
  let front = 0;
  let rear = A.length;
  while (front !== rear) {
    const frontMul = sortedA[front] * sortedB[front]
    const rearMul = sortedA[rear - 1] * sortedB[rear - 1];
    if (frontMul < rearMul) {
      result += frontMul
      front += 1
    } else {
      result += rearMul;
      rear -= 1;
    }
  }
  return result;
}

(() => {
  const A = [1, 4, 2]
  const B = [5, 4, 4]
  console.log(solution(A, B))
})()