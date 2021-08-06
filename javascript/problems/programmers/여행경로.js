const makeGraph = tickets => {
    const graph = {}
    tickets.forEach(([from, to]) => {
        graph[from] = (graph[from] === undefined) ? [to] : [ ...graph[from], to ]
    })
    return graph;
};
const dfs = (start, ticketCounts, graph, nowCase, allCases) => {
    if (nowCase.length > ticketCounts) return;
    nowCase.push(start);
    if (nowCase.length === ticketCounts + 1) allCases.push([ ...nowCase ])
    if (graph[start] !== undefined) {
        graph[start].forEach((now, idx) => {
            const graphStart = [ ...graph[start] ]
            graphStart.splice(idx, 1);
            const copiedGraph = { ... graph, [start]: graphStart }
            dfs(now, ticketCounts, copiedGraph, [ ...nowCase ], allCases);
        })
    }
    return allCases
}

const solution = (tickets) => {
    const nowCase = [];
    const allCases = [];
    const graph = makeGraph(tickets);
    dfs("ICN", tickets.length, graph, nowCase, allCases);
    const selectedOptimizedCase = allCases.sort()
    return selectedOptimizedCase[0];
}
const tickets=[['ICN','A'],['A','B'],['A','C'],['C','A'],['B','D']]
console.log(solution(tickets))