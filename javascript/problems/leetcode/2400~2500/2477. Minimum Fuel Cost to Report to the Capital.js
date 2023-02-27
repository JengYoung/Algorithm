const makeGraph = (roads) => {
  const graph = new Array(roads.length + 1).fill().map(() => []);

  roads.forEach(([city1, city2]) => {
    graph[city1].push(city2);
    graph[city2].push(city1);
  });

  return graph;
};

const checkGoTogether = (total, seats) => total <= seats;

const dfs = (graph, visited, root, liter, seats) => {
  visited[root] = true;

  if (graph[root].length === 1 && root !== 0) {
    return { liter: 0, cars: 1, cnt: 1 };
  }

  const nowLiter = liter;
  const nowSeats = seats;

  let cars = 1;
  let nowCnt = 1;

  for (const nextCity of graph[root]) {
    if (visited[nextCity]) continue;

    const {
      liter: childLiter,
      cars: childCars,
      cnt: childCnt,
    } = dfs(graph, visited, nextCity, nowLiter, nowSeats);

    if (checkGoTogether(nowCnt + childCnt, seats)) {
      cars += childCars - 1;
      nowCnt += childCnt;
    } else {
      cars += childCars;
      nowCnt = nowCnt + childCnt - seats;
    }

    liter += childCars + childLiter;
  }

  return { liter, cars, cnt: nowCnt };
};

/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
const minimumFuelCost = (roads, seats) => {
  const graph = makeGraph(roads);
  const visited = new Array(roads.length + 1).fill(false);

  return dfs(graph, visited, 0, 0, seats).liter;
};

{
  const roads = [
    [3, 1],
    [3, 2],
    [1, 0],
    [0, 4],
    [0, 5],
    [4, 6],
  ];
  const seats = 2;

  console.log(minimumFuelCost(roads, seats));
}

{
  const roads = [
    [0, 1],
    [0, 2],
    [3, 2],
    [0, 4],
    [1, 5],
    [5, 6],
    [3, 7],
  ];

  const seats = 1;

  console.log(minimumFuelCost(roads, seats));
}

{
  const roads = [
    [1, 0],
    [0, 2],
    [2, 3],
    [0, 4],
    [5, 2],
    [6, 4],
    [3, 7],
    [7, 8],
    [9, 0],
  ];
  const seats = 10;

  console.log(minimumFuelCost(roads, seats));
}

{
  const roads = [
    [0, 1],
    [1, 2],
  ];

  const seats = 3;

  console.log(minimumFuelCost(roads, seats));
}
