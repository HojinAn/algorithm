function solution(arr) {
    let i = 0;
    const len = arr.length;
    const stk = [];
    while (i < len) {
        if (stk.length === 0 || stk[stk.length - 1] < arr[i]) {
            stk.push(arr[i]);
            i++;
        } else {
            stk.pop();
        }
    }
    return stk;
}