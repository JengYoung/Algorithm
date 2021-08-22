/*
    사이즈가 큰 블럭으로 바꿔준다.
*/

const makeBlockByDFS = (x, y, table, res = []) => {
    if (!table[x][y]) return;
    const nx = [1, -1, 0, 0].map(i => x + i);
    const ny = [0, 0, 1, -1].map(i => y + i);
    const nxny = Array.from(new Array(4), (_, i) => {
        console.log(nx[i],ny[i])
    })
    return nxny;
}

const makeBlockDataset = (table) => {
    const data = table.map(((data, y) => {
            return data.map((xValue, x) => {
                return makeBlockByDFS(x, y, table)
            })
        }
    ))
    return data;
}
const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    };

    for (const a of iter) {
        acc = f(acc, a);
    };
    return acc;
}
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

/* 
    일단 데이터들을 만들고
    이 데이터들을 돌릴 bfs함수를 만들자.
    1. 맞지 않는 경우: 360도를 돌려서 벗어나거나 맞지 않으면 다음 위치만 업데이트 해서 큐에 넣어준다.
    2. 맞는 경우: 결국 공백이 없어야 할 뿐이므로 큐에서 해당 블럭을 빼주고, 다음 위치를 담은 큐를 포함해서 넣어준다.
 */

function solution(game_board, table) {
    const blockDataset = makeBlockDataset(table);
    return pipe(
        makeBlockDataset    
    )(table)
}

const game_board = [[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]];

const table = [[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]];

console.log(solution(game_board, table));