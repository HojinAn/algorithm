function solution(x, y, n) {
    const q = [[x, 0]];
    const visited = Array(y + 1).fill(false);
    const DIR = [x=>x+n, x => x * 2, x => x * 3];
    visited[x] = true;
    let qIdx = 0, qSize = 1;
    while (qIdx < qSize) {
        const [cur, cnt] = q[qIdx++];
        if (cur === y) return cnt;
        DIR.forEach((fn) => {
            const next = fn(cur);
            if (next <= y && !visited[next]) {
                visited[next] = true;
                q[qSize++] = [next, cnt + 1];
            }
        })
    }
    return -1;
}