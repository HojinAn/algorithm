function solution(weights) {
    const isPair = (a, b) => a === b || a * 3 === b * 2 || a * 2 === b * 3 || a * 2 === b || a === b * 2 || a * 3 === b * 4 || a * 4 === b * 3;
    const counter = weights.reduce((cntr, weight) => {
        const val = cntr[weight] || 0;
        cntr[weight] = val + 1;
        return cntr;
    }, {});
    let count = Object.entries(counter).reduce((cnt, [s, val]) => cnt + (val * (val - 1) / 2), 0);
    const pairs = Object.entries(counter);
    const len = pairs.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            if (isPair(+pairs[i][0], +pairs[j][0])) {
                count += pairs[i][1] * pairs[j][1];
            }
        }
    }
    return count;
}