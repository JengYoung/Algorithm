const canCompleteCircuit = (gas, cost) => {
  const prefixSumStack = [];

  let maxValue = -Infinity;
  let maxValueIndex = 0;

  let total = 0;

  for (let i = gas.length - 1; i >= 0; i -= 1) {
    const diff = gas[i] - cost[i];

    total += diff;

    if (total >= maxValue) {
      maxValue = total;
      maxValueIndex = i;
    }

    prefixSumStack.push(total);
  }

  return prefixSumStack.pop() < 0 ? -1 : maxValueIndex;
};

console.log('-------------------- should be 3');
{
  const gas = [1, 2, 3, 4, 5];
  const cost = [3, 4, 5, 1, 2];

  console.log(canCompleteCircuit(gas, cost));
}
console.log('-------------------- should be 0');
{
  const gas = [3, 1, 1];
  const cost = [1, 2, 2];

  console.log(canCompleteCircuit(gas, cost));
}

console.log('-------------------- should be -1');
{
  const gas = [2, 3, 4];
  const cost = [3, 4, 3];

  console.log(canCompleteCircuit(gas, cost));
}

console.log('-------------------- should be 4');
{
  const gas = [5, 1, 2, 3, 4];
  const cost = [4, 4, 1, 5, 1];

  console.log(canCompleteCircuit(gas, cost));
}

console.log('--------------------');
{
  const gas = [
    67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
    86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
    45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
    64, 65, 66,
  ];
  const cost = [
    27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
    46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
    65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
    84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 1, 2,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    24, 25, 26,
  ];

  console.log(
    'diff: ',
    gas.map((v, i) => v - cost[i])
  );

  console.log(canCompleteCircuit(gas, cost));
}
