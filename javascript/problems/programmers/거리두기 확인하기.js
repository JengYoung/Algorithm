const deepCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};
const bfs = (place, visited) => {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const q = [];
  const initVisited = deepCopy(visited);

  for (let i = 0; i < place.length; i += 1) {
    for (let j = 0; j < place[0].length; j += 1) {
      const nextVisited = deepCopy(initVisited);
      q.push([i, j, 0, +(place[i][j] === "P"), nextVisited]);
      initVisited[i][j] = true;
    }
  }

  while (q.length) {
    const [x, y, cnt, peopleCnt, nowVisited] = q.shift();
    if (cnt === 2) continue;
    nowVisited[x][y] = true;
    for (let i = 0; i < 4; i += 1) {
      const [dx, dy] = directions[i];
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < 5 && ny < 5) {
        if (place[nx][ny] === "X") continue;
        if (place[nx][ny] === "P" && peopleCnt === 1 && !nowVisited[nx][ny])
          return 0;
        q.push([
          nx,
          ny,
          cnt + 1,
          peopleCnt + +(place[nx][ny] === "P"),
          deepCopy(nowVisited),
        ]);
      }
    }
  }
  return 1;
};

const solution = (places) => {
  const arr = [];
  const visited = Array.from({ length: places.length }, () =>
    new Array(places[0].length).fill(false)
  );
  places.forEach((place) => arr.push(bfs(place, visited)));
  return arr;
};

const places = [
  ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
  ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
  ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
  ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
  ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
];

console.log(solution(places));
