const mask = (v) => {
  const target = BigInt(v);

  const bit = target.toString(2);

  const last0Index = bit.lastIndexOf('0');

  if (last0Index > 0) {
    if (last0Index === bit.length - 1) {
      return target + 1n;
    }

    const plus = bit.slice(last0Index);

    const diff = BigInt(1n << BigInt(plus.length - 2));
    return target + (diff > 0n ? diff : 0n);
  }

  return Number(target + BigInt((1n << BigInt(bit.length)) / 2n));
};

function solution(numbers) {
  return numbers.map(mask);
}
