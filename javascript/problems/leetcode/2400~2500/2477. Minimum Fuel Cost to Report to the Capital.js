const makeGraph = (roads) => {
  const graph = new Array(roads.length + 1).fill().map(() => []);

  roads.forEach(([city1, city2]) => {
    graph[city1].push(city2);
    graph[city2].push(city1);
  });

  return graph;
};

/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
const minimumFuelCost = (roads, seats) => {
  const graph = makeGraph(roads);

  let cost = 0;

  const dfs = (node, parent) => {
    let people = 1;

    for (const nextCity of graph[node]) {
      if (nextCity === parent) continue;

      const childPeople = dfs(nextCity, node);

      people += childPeople;
    }

    if (parent === null) {
      return cost;
    } else {
      cost += Math.ceil(people / seats);
      return people;
    }
  };

  return dfs(0, null);
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
