const deepCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const check = (nx, ny, place) =>
  nx >= 0 && ny >= 0 && nx < 5 && ny < 5 && !(place[nx][ny] === "X");

const checkPerson = (val) => val === "P";

const bfs = (place) => {
  const q = [];
  const visited = Array.from({ length: place.length }, () =>
    new Array(place[0].length).fill(false)
  );

  for (let i = 0; i < place.length; i += 1) {
    for (let j = 0; j < place[0].length; j += 1) {
      q.push([i, j, 0, checkPerson(place[i][j]), deepCopy(visited)]);
      visited[i][j] = true;
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
      if (check(nx, ny, place)) {
        const isPerson = checkPerson(place[nx][ny]);
        if (isPerson && peopleCnt && !nowVisited[nx][ny]) return 0;
        q.push([nx, ny, cnt + 1, peopleCnt + isPerson, deepCopy(nowVisited)]);
      }
    }
  }
  return 1;
};

const solution = (places) => places.map((place) => bfs(place));
