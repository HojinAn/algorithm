function solution(arr) {
    const len = arr.length;
    let l = 0,
        r = len - 1;
    while (l < len && arr[l] !== 2) {
        l++;
    }
    while (r > 0 && arr[r] !== 2) {
        r--;
    }
    if (r < l) {
        return [-1];
    }
    return arr.slice(l, r + 1);
}