/**
 * NOTE:
 * L: 0
 * R: 1
 * U: 2
 * D: 3
 */
const directions = {
  0: [0, -1],
  1: [0, 1],
  2: [-1, 0],
  3: [1, 0],
};

// nextDirections[기준 위치의 기호][이전 방향] = 다음 방향
const nextDirections = {
  L: {
    0: 3,
    1: 2,
    2: 0,
    3: 1,
  },
  R: {
    0: 2,
    1: 3,
    2: 1,
    3: 0,
  },
  S: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
  },
};

// 3차원 배열로 변환시킴
const make3DemensionArray = (grid) => {
  const arr = JSON.parse(JSON.stringify(grid));

  for (let i = 0; i < arr.length; i += 1) {
    arr[i] = arr[i].split('');

    for (let j = 0; j < arr[i].length; j += 1) {
      arr[i][j] = [arr[i][j], [false, false, false, false]];
    }
  }

  return arr;
};

// 다음 x, y 좌표를 만들어줌.
const getNextXY = (x, y, direction, xLength, yLength) => {
  const [dx, dy] = directions[direction];

  let nx = x + dx;
  let ny = y + dy;

  if (nx === xLength) {
    nx = 0;
  } else if (nx < 0) {
    nx = xLength - 1;
  }

  if (ny === yLength) {
    ny = 0;
  } else if (ny < 0) {
    ny = yLength - 1;
  }

  return [nx, ny];
};

const bfs = (arr, startX, startY, startDirection, initData) => {
  const result = []; // 현재 방문 x -> 방문하게 만들 거고, 그 다음에 이제 결과 값(순환 사이클이 돌았을 때의 값을 담는 배열)

  const queue = [];
  const xLength = arr.length;
  const yLength = arr[0].length;

  arr[startX][startY][1][startDirection] = true;
  queue.push(initData);

  while (queue.length) {
    const [nowX, nowY, nowD, count] = queue.shift();
    arr[nowX][nowY][1][nowD] = true;

    const [nextX, nextY] = getNextXY(nowX, nowY, nowD, xLength, yLength);
    const nextValue = arr[nextX][nextY][0]; // S L R
    const nextDirection = nextDirections[nextValue][nowD]; // 0 1 2 3
    const nextCount = count + 1;

    if (arr[nextX][nextY][1][nextDirection]) {
      // 만약 방문을 한 곳이라면
      if (
        nextX === startX &&
        nextY === startY &&
        startDirection === nextDirection
      ) {
        // 순환 사이클이 돌았다면
        result.push(nextCount); // 추가를 해줌.
      }
      continue;
    }

    // 방문을 안했다면
    queue.push([nextX, nextY, nextDirection, nextCount]);
  }

  return result;
};

const solution = (grid) => {
  const result = [];

  const arr = make3DemensionArray(grid); // "SL", => [["S", [false, falase, false, false]], ["L", "..."]]
  const xLength = arr.length; // row 행
  const yLength = arr[0].length; // col열

  for (let i = 0; i < xLength; i += 1) {
    for (let j = 0; j < yLength; j += 1) {
      for (let k = 0; k < 4; k += 1) {
        if (!arr[i][j][1][k]) {
          // !visited
          result.push(...bfs(arr, i, j, k, [i, j, k, 0])); // nowX, nowY, nowD, count
        }
      }
    }
  }

  return [...result].sort((a, b) => a - b);
};

(() => {
  const grid = ['SL', 'LR'];
  console.log(solution(grid)); //[16]
})();

(() => {
  const grid = ['S'];
  console.log(solution(grid)); //[1,1,1,1]
})();

(() => {
  const grid = ['R', 'R'];
  console.log(solution(grid)); //[4,4]
})();
