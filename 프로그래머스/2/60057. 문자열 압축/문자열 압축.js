function solution(s) {
    const halfLen = Math.ceil(s.length / 2);
    return [...Array(halfLen)].map((_, i) => i + 1).reduce((result, size) => {
        const cnt = calcShortLen(s, size);
        return Math.min(result, cnt);
    }, 10000);
}

function calcShortLen(s, size) {
    const ans = [];
    const counter = [];
    const len = s.length;
    let pivot = s[0];
    for (let i = 0; i < len; i += size) {
        const k = s.slice(i, i + size);
        if (pivot !== k) {
            counter.length && ans.push(`${counter.length < 2 ? '' : counter.length}${counter[0]}`);
            while (counter.length) {
                counter.pop();
            }
            pivot = k;
        }
        counter.push(k);
    }
    counter.length && ans.push(`${counter.length < 2 ? '' : counter.length}${counter[0]}`);
    while (counter.length) {
        counter.pop();
    }
    return ans.join('').length;
}