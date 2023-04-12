function solution(s) {
    const n = s.length;
    for (let r = n - 1; r >= 0; r--) {
        for (let l = 0; l + r < n; l++) {
            if (isPal(s.slice(l, l + r + 1))) return r + 1;
        }
    }
}

function isPal(str) {
    let l = 0;
    let r = str.length - 1;
    while (l < r) if (str[l++] !== str[r--]) return false;
    return true;
}