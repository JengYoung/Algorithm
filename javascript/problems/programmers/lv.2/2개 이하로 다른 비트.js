const mask = (v) => {
  const target = BigInt(v);
  let i = BigInt(v);

  while (true) {
    i += BigInt(1);

    const diffCount = (i ^ target).toString(2).replace(/0/g, '').length;

    if (diffCount <= 2) {
      break;
    }
  }

  return Number(i);
};

function solution(numbers) {
  return numbers.map(mask);
}
