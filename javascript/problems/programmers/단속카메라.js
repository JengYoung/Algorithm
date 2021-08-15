const solution = routes => {
    if (routes.length === 1) return 1;
    let cameraCount = 0;
    let last = -Infinity;
    routes.sort((a, b) => a[1] - b[1]).forEach(([from, to]) => {
        if (last < from) {
            cameraCount++;
            last = to;
        }
    })
    return cameraCount
}

(() => {
    const routes = [[-1, 3], [-5, -1], [3, 56]];
    console.log(solution(routes));
})();

(() => {
    const routes = [[-20,15], [-14,-5], [-18,-13], [-5,-3]]
    console.log(solution(routes));
})()