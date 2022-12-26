const getSortedArray = (n) => {
  const res = [1];

  while (res.length < n) {
    let now = res.at(-1) * 10;

    while (now > n) {
      now = Math.floor(now / 10);

      now += 1;

      while (!(now % 10)) {
        now = Math.floor(now / 10);
      }
    }

    res.push(now);
  }

  return res;
};

const lexicalOrder = (n) => {
  return getSortedArray(n);
};

console.log(lexicalOrder(13));
