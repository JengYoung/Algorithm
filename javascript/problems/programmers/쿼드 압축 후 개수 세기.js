const getNextXYs = (startX, startY, endX, endY) => {
  const halfX = parseInt((endX + startX) / 2);
  const halfY = parseInt((endY + startY) / 2);

  return {
    1: {
      startX: halfX,
      startY,
      endX,
      endY: halfY,
    },
    2: {
      startX,
      startY,
      endX: halfX,
      endY: halfY,
    },
    3: {
      startX,
      startY: halfY,
      endX: halfX,
      endY,
    },
    4: {
      startX: halfX,
      startY: halfY,
      endX,
      endY,
    },
  };
};

const check = (arr, startX, startY, endX, endY, checkValue) => {
  for (let i = startX; i < endX; i += 1) {
    for (let j = startY; j < endY; j += 1) {
      if (arr[i][j] !== checkValue) return false;
    }
  }

  return true;
};

const dfs = (arr, length, startX, startY, endX, endY, counts) => {
  if (arr.length === length) {
    const checkValue = arr[startX][startY];
    if (check(arr, startX, startY, endX, endY, checkValue)) {
      counts[checkValue] += 1;
      return;
    }
  }

  if (length === 1) {
    counts[arr[startX][startY]] += 1;
    return;
  }

  // NOTE: 사분면을 맞춰주기 위해 0은 true로 설정.
  const compressed = [true, false, false, false, false];
  const nextXYs = getNextXYs(startX, startY, endX, endY);

  compressed.forEach((_, idx) => {
    if (!idx) return;

    const { startX, startY, endX, endY } = nextXYs[idx];
    compressed[idx] = check(
      arr,
      startX,
      startY,
      endX,
      endY,
      arr[startX][startY]
    );
  });

  compressed.forEach((bool, idx) => {
    if (!idx) return;

    const { startX, startY, endX, endY } = nextXYs[idx];

    if (bool) {
      counts[arr[startX][startY]] += 1;
      return;
    }

    dfs(arr, parseInt(arr.length / 2), startX, startY, endX, endY, counts);
  });
};

const solution = (arr) => {
  let counts = { 0: 0, 1: 0 };
  dfs(arr, arr.length, 0, 0, arr.length, arr[0].length, counts);

  return Object.values(counts);
};

(() => {
  const arr = [
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ];

  console.log(solution(arr));
})();

(() => {
  const arr = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ];

  console.log(solution(arr));
})();

(() => {
  const arr = [[0]];

  console.log(solution(arr));
})();

(() => {
  const arr = [[1]];

  console.log(solution(arr));
})();

(() => {
  const arr = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  console.log(solution(arr));
})();
