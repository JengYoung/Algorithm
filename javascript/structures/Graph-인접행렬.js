const graph = Array.from(
    Array(5),
    () => Array(5).fill(false)
);


graph[0][1] = true;
graph[0][3] = true;
graph[1][2] = true;
graph[2][0] = true;
graph[2][4] = true;
graph[3][2] = true;
graph[4][0] = true;