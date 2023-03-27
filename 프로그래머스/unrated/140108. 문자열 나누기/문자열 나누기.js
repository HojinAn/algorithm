function solution(s) {
    const n = s.length;
    let cnt = 1;
    let arr = [1, 0];
    let x = s[0];
    for (let i = 1; i < n; i++) {
        const str = s[i];
        if (arr[0] === arr[1]) {
            cnt++;
            arr = [1, 0];
            x = str;
            continue;
        }
        if (x === str) arr[0]++;
        else arr[1]++;
    }
    return cnt;
}