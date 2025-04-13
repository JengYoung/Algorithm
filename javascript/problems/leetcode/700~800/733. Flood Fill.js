const dfs = ({ image, sr, sc, originalColor, nextColor, visited }) => {
    if (sr < 0 || sc < 0 || sr >= image.length || sc >= image[0]?.length) {
        return;
    }

    if (visited.has(String([sr, sc]))) {
        return;
    }

    if (image[sr][sc] !== originalColor) {
        return;
    }

    image[sr][sc] = nextColor;
    visited.add(String([sr, sc]))

    dfs({image, sr: sr - 1, sc, originalColor, nextColor, visited});
    dfs({image, sr: sr + 1, sc, originalColor, nextColor, visited});
    dfs({image, sr: sr, sc: sc + 1, originalColor, nextColor, visited});
    dfs({image, sr: sr, sc: sc - 1, originalColor, nextColor, visited});
}

const floodFill = function(image, sr, sc, color) {
    const originalColor = image[sr][sc];
    const nextColor = color;

    const visited = new Set()

    dfs({ image, sr, sc, originalColor, nextColor, visited })

    return image;
};

console.log(floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)) // [[2,2,2],[2,2,0],[2,0,1]]
console.log(floodFill([[0,0,0],[0,0,0]], 0, 0, 0)) // [[2,2,2],[2,2,0],[2,0,1]]