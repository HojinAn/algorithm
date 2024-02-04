const DIR = {
    r: [0, 1],
    d: [1, 0],
    l: [0, -1],
    u: [-1, 0],
};

function solution(n) {
    const ans = [...Array(n)].map(() => Array(n).fill(0));
    const shouldRotate = ([r, c], d) => {
        if (0 <= r && r < n && 0 <= c && c < n) {
            const [nr, nc] = [r + DIR[d][0], c + DIR[d][1]];
            if (ans[nr]?.[nc] === undefined || ans[nr][nc] > 0) {
                return true;
            }
            return false;
        }
        return true;
    };
    let [r, c] = [0, 0];
    let dir = 'r';
    for (let i = 1; i <= n * n; i++) {
        ans[r][c] = i;
        if (shouldRotate([r, c], dir)) {
            dir = rotate(dir);
        }
        [r, c] = [r + DIR[dir][0], c + DIR[dir][1]];
    }
    return ans;
}

function rotate(d) {
   	switch(d) {
        case 'r':
            return 'd';
        case 'd':
            return 'l';
        case 'l':
            return 'u';
        case 'u':
            return 'r';
        default:
            return d;
    }
}