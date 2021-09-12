/*
    1. brown을 통해 가로 + 세로를 구한다.
        * (brown + 4) / 2 = (가로+세로)
    2. for문을 통해 임의의 가로, 세로를 정한다.
    3. 가로 및 세로를 대입하여 노랑이 적합한지를 구한다.
        yellow: (가로 - 2) * (세로 - 2)
    4. 리턴
*/

const getHalfPerimeter = (brown) => (brown + 4) / 2;
const checkValid = (yellow, width, height) => ((width - 2) * (height - 2)) === yellow ? true : false
const solution = (brown, yellow) => {
    const halfPerimeter = getHalfPerimeter(brown);
    for (let height = 3; height < halfPerimeter; height += 1) {
        const width = halfPerimeter - height;
        if (checkValid(yellow, width, height)) return [width, height]
    }
    // 만약 답이 없을 경우
    return -1;
}

/*
    다른 풀이
*/

(() => {
  const findRow = (brown, yellow) => {
    const allGridCnt = brown + yellow;
    let rowcolSum = (brown + 4) / 2 
    let row = rowcolSum;
    let col = 0;
    while (rowcolSum > 0) {
      row -= 1;
      col += 1;
      rowcolSum -= 1;
      if (row * col === allGridCnt) return [row, col]
    }
  }
    
  const solution = (brown, yellow) => {
    return findRow(brown, yellow);
  }
    
  const brown = 10;
  const yellow = 2;
  console.log(solution(brown, yellow))
})()