function solution(n, m, section) {
    const painted = Array(n + 1).fill(true);
    section.forEach((no) => (painted[no] = false));
    let cnt = 0;
    for (let i = 1; i <= n; i++) {
        if (!painted[i]) {
            let j = 0;
            while (j++ < m) painted[i++] = true;
            cnt++;
            i--;
        }
    }
    return cnt;
}