const numIslands = (grid) => {
  const bfs = (x, y) => {
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    const queue = [];
    queue.push([x, y]);

    while (queue.length) {
      const [x, y] = queue.shift();
      if (!grid[x][y]) continue;
      grid[x][y] = 0;

      for (let i = 0; i < 4; i += 1) {
        const [dx, dy] = directions[i];

        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < rowLength &&
          ny >= 0 &&
          ny < colLength &&
          grid[nx][ny] === '1'
        ) {
          queue.push([nx, ny]);
        }
      }
    }
  };

  let isLandCount = 0;

  const rowLength = grid.length;
  const colLength = grid[0].length;

  for (let i = 0; i < rowLength; i += 1) {
    for (let j = 0; j < colLength; j += 1) {
      const now = grid[i][j];

      if (now === '1') {
        bfs(i, j);
        isLandCount += 1;
      }
    }
  }

  return isLandCount;
};

(() => {
  const grid = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0'],
  ];
  console.log(numIslands(grid));
})();

(() => {
  const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1'],
  ];
  console.log(numIslands(grid));
})();
