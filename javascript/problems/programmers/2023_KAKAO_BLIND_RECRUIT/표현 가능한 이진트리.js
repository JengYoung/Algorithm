const squares = [];

for (let i = 0; i <= 14; i += 1) {
  squares.push(2 ** i);
}

const checkBinaryTree = (binary, start, end) => {
  const mid = Math.floor((start + end) / 2);
  const rootValue = binary[mid];

  if (start >= end) {
    return { success: true, value: rootValue };
  }

  const isLeftValid = checkBinaryTree(binary, start, mid - 1);
  const isRightValid = checkBinaryTree(binary, mid + 1, end);

  if (isLeftValid.value === '1' || isRightValid.value === '1') {
    if (rootValue === '0') return { success: false, value: rootValue };
  }

  if (!isLeftValid.success || !isRightValid.success) {
    return { success: false, value: rootValue };
  }

  return { success: true, value: rootValue };
};

const checkRepresentationalBinaryTree = (value) => {
  const binaryValue = value.toString(2);

  const v = squares.find((v) => binaryValue.length < v);
  const result = binaryValue.padStart(v - 1, '0');

  return checkBinaryTree(result, 0, result.length - 1).success ? 1 : 0;
};

const solution = (numbers) => {
  return numbers.map(checkRepresentationalBinaryTree);
};

console.log(solution([1]));
