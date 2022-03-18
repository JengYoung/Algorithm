const solution = (dirs) => {
  const directions = {
    U: [0, -1],
    L: [-1, 0],
    D: [0, 1],
    R: [1, 0]
  };
  
  let answer = 0;
  const visited = new Set();
  
  let x = 0; 
  let y = 0;

  [...dirs].forEach(dir => {
      const [dx, dy] = directions[dir];
      const nx = x + dx;
      const ny = y + dy;

      const stringifiedVisitedEdge = JSON.stringify([x, y, nx, ny]);
      const checkVisitedValues = [stringifiedVisitedEdge, JSON.stringify([nx, ny, x, y])]

      if (nx > 5 || nx < -5 || ny > 5 || ny < -5 ) return;

      x = nx;
      y = ny;

      if (!checkVisitedValues.some(value => visited.has(value))) {
        visited.add(stringifiedVisitedEdge)      
        answer += 1;
      }
  })
  
  return answer;
}

(() => {
  const dirs = "ULURRDLLU"
  console.log(solution(dirs))
})();

(() => {
  const dirs = "LULLLLLLU"
  console.log(solution(dirs))
})();