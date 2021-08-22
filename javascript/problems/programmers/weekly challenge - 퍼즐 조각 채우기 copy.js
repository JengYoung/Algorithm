const dfs = (x, y, length, visited, res, table) => {
    visited[x][y] = true;

    const dx = [1, -1, 0, 0]; // 동 서 남 북
    const dy = [0, 0, 1, -1]; // 동 서 남 북
    
    for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx < length && ny < length && nx >= 0 && ny >= 0) {
            if (!visited[nx][ny] && table[ny][ny]){
                res = dfs(nx, ny, length, visited, res.concat([[nx, ny]]), table)
            }
        }
    }
    return res;
}

const getBlocks = (table) => {
    const arr = [];
    const length = table.length;
    const visited = Array.from(new Array(length), _ => new Array(length).fill(false));
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (table[i][j] === 1 && !visited[i][j]) {
                const result = dfs(i, j, length, visited, [[i, j]], table);
                arr.push(result)
                for (const [x, y] of result) {
                    visited[x][y] = true;
                }
            }
        }
    }
    return arr;
}

const solution = (game_board, table) => {
    return getBlocks(table)
}
const game_board = [
    [1,1,0,0,1,0],
    [0,0,1,0,1,0],
    [0,1,1,0,0,1],
    [1,1,0,1,1,1],
    [1,0,0,0,1,0],
    [0,1,1,1,0,0]
];

const table = [
    [1,0,0,1,1,0],
    [1,0,1,0,1,0],
    [0,1,1,0,1,1],
    [0,0,1,0,0,0],
    [1,1,0,1,1,0],
    [0,1,0,0,0,0]
];

console.log(solution(game_board, table));