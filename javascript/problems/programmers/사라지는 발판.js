const check = (board, x, y) => {
  return (
    x >= 0 &&
    y >= 0 &&
    x < board.length &&
    y < board[0].length &&
    board[x][y] !== 0
  );
};

const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function solution(board, aloc, bloc) {
  const playA = (depth, a, b, board) => {
    const [ax, ay] = a;
    const [bx, by] = b;

    const nowBoard = JSON.parse(JSON.stringify(board));

    const winCaseDepths = [];
    const loseCaseDepths = [];

    for (const [dx, dy] of directions) {
      const nx = ax + dx;
      const ny = ay + dy;

      if (check(nowBoard, nx, ny)) {
        nowBoard[ax][ay] = 0;

        const result = playB(depth + 1, [nx, ny], [bx, by], nowBoard);
        (result.winner === 'A' ? winCaseDepths : loseCaseDepths).push(result);
      }
    }

    if (
      (winCaseDepths.length || loseCaseDepths.length) &&
      ax === bx &&
      ay == by
    ) {
      return {
        winner: 'A',
        depth: depth + 1,
      };
    }

    if (winCaseDepths.length) {
      return {
        winner: 'A',
        depth: Math.min(...winCaseDepths.map((v) => v.depth)),
      };
    } else if (loseCaseDepths.length) {
      return {
        winner: 'B',
        depth: Math.max(...loseCaseDepths.map((v) => v.depth)),
      };
    } else {
      return {
        winner: 'B',
        depth,
      };
    }
  };

  const playB = (depth, a, b, board) => {
    const [ax, ay] = a;
    const [bx, by] = b;

    const nowBoard = JSON.parse(JSON.stringify(board));

    const winCaseDepths = [];
    const loseCaseDepths = [];

    for (const [dx, dy] of directions) {
      const nx = bx + dx;
      const ny = by + dy;

      if (check(nowBoard, nx, ny)) {
        nowBoard[bx][by] = 0;

        const result = playA(depth + 1, [ax, ay], [nx, ny], nowBoard);
        (result.winner === 'B' ? winCaseDepths : loseCaseDepths).push(result);
      }
    }

    if (
      (winCaseDepths.length || loseCaseDepths.length) &&
      ax === bx &&
      ay == by
    ) {
      return {
        winner: 'B',
        depth: depth + 1,
      };
    }

    if (winCaseDepths.length) {
      return {
        winner: 'B',
        depth: Math.min(...winCaseDepths.map((v) => v.depth)),
      };
    } else if (loseCaseDepths.length) {
      return {
        winner: 'A',
        depth: Math.max(...loseCaseDepths.map((v) => v.depth)),
      };
    } else {
      return {
        winner: 'A',
        depth,
      };
    }
  };

  const result = playA(0, aloc, bloc, board);

  return result.depth;
}

{
  // 5
  const board = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const aloc = [1, 0];
  const bloc = [1, 2];

  console.log(solution(board, aloc, bloc));
}

{
  // 4
  const board = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const aloc = [1, 0];
  const bloc = [1, 2];

  console.log(solution(board, aloc, bloc));
}

{
  // 4
  const board = [[1, 1, 1, 1, 1]];
  const aloc = [0, 0];
  const bloc = [0, 4];

  console.log(solution(board, aloc, bloc));
}

{
  // 0
  const board = [[1]];
  const aloc = [0, 0];
  const bloc = [0, 0];

  console.log(solution(board, aloc, bloc));
}
