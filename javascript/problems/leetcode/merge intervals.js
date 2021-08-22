/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
 const merge = intervals => {
    const stack = [];
    intervals
        .sort((a, b) => a[0] - b[0])
        .map(([ start, end ]) => {
            if (!stack.length || stack[stack.length - 1][1] < start) {
                stack.push([start, end])
            } else {
                const [ prevStart, prevEnd ] = stack.pop();
                stack.push([Math.min(prevStart, start), Math.max(prevEnd, end)])
            }
        })
    return stack;
};