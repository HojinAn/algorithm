function solution(arr) {
    let i = 0;
    const len = arr.length;
    const stk = [];
    while (i < len) {
        if (stk.length === 0) {
            stk.push(arr[i]);
            i++;
        } else if (stk[stk.length - 1] === arr[i]) {
            stk.pop();
            i++;
        } else {
            stk.push(arr[i]);
            i++;
        }
    }
    return stk.length ? stk : [-1];
}