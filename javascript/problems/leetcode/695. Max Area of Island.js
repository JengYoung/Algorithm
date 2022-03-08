const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

const maxAreaOfIsland = grid => {
    const rowLength = grid.length;
    const colLength = grid[0].length;

    let answer = 0;

    for (let i = 0; i < grid.length; i += 1) {
        for (let j = 0; j < grid[0].length; j += 1) {
            const queue = [];
            let cnt = 0;

            if (grid[i][j] === 1) {
                queue.push([i, j])
            }

            while (queue.length) {
                const [x, y] = queue.shift();

                if (!grid[x][y]) continue;
                grid[x][y] = 0;
                cnt += 1;
                
                for (let i = 0; i < 4; i += 1) {
                    const [dx, dy] = directions[i];
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx < 0 || ny < 0 || nx >= rowLength || ny >= colLength || !grid[nx][ny]) continue;
                    queue.push([nx, ny])
                }
            }

            answer = Math.max(answer, cnt)
        }
    }
    return answer;
};

(() => {
    const grid = [
        [0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]
    ];

    console.log(maxAreaOfIsland(grid));
})();


(() => {
    const grid = [
        [1,1,0,0,0],
        [1,1,0,0,0],
        [0,0,0,1,1],
        [0,0,0,1,1]
    ]

    console.log(maxAreaOfIsland(grid));
})();