const arr = [];

function solution(l, r) {
    recur();
    const ans = arr.map(Number).sort((a, b) => a - b).filter((no) => l <= no && no <= r);
    return ans.length ? ans : [-1];
}

function recur (str = '') {
    if (str.length > 6 || str.startsWith('0')) {
        return;
    }
    str && arr.push(str);
    recur(str + '0');
    recur(str + '5');
}