/**
 * @param {number[][]} grid
 * @return {number}
 */
const islandPerimeter = grid => {
  const isLandXY = getIsLandXY(grid);
  return getResult(isLandXY);
}

const getIsLandXY = (grid) => {
  let arr = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const now = grid[i][j]
      arr = [...arr, ...(now ? [`${i},${j}`] : [])];
    }
  }
  return arr;
}

const getResult = (arr) => {
  let result = 0;
  arr.forEach(xy => {
    const [x, y] = xy.split(',');
    const nxny = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    let cnt = 4;
    for (let i = 0; i < 4; i += 1) {
      const [ nx, ny ] = nxny[i];
      cnt -= arr.includes(`${x * 1 + nx * 1},${y * 1 + ny * 1}`) ? 1 : 0
    }
    result += cnt;
  })
  return result;
}

const grid = [[0,1]];
console.log(islandPerimeter(grid));