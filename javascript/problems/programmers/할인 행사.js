const solution = (want, number, discount) => {
  let result = 0;

  const check = (map, bucketList) => {
    let flag = true;

    bucketList.forEach((value, key) => {
      if (map.get(key) !== value) {
        flag = false;
      }
    });

    return flag;
  };

  const initialize = () => {
    const map = new Map();

    const bucketList = new Map();
    want.forEach((v, index) => {
      bucketList.set(v, number[index]);
    });

    for (let i = 0; i < 10; i += 1) {
      const now = discount[i];

      map.set(now, (map.get(now) ?? 0) + 1);
      if (check(map, bucketList)) {
        result += 1;
      }
    }

    return { map, bucketList };
  };

  const { map, bucketList } = initialize();

  for (let i = 0; i < discount.length - 10; i += 1) {
    const prev = discount[i];
    const next = discount[i + 10];

    map.set(prev, (map.get(prev) ?? 0) - 1);
    if (map.get(prev) <= 0) {
      map.delete(prev);
    }

    map.set(next, (map.get(next) ?? 0) + 1);

    if (check(map, bucketList)) {
      result += 1;
    }
  }

  return result;
};

(() => {
  console.log(
    solution(
      ['banana', 'apple', 'rice', 'pork', 'pot'],
      [3, 2, 2, 2, 1],
      [
        'chicken',
        'apple',
        'apple',
        'banana',
        'rice',
        'apple',
        'pork',
        'banana',
        'pork',
        'rice',
        'pot',
        'banana',
        'apple',
        'banana',
      ]
    )
  );
})(); // 3

(() => {
  console.log(
    solution(
      ['apple'],
      [10],
      [
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
        'banana',
      ]
    )
  );
})(); // 0
