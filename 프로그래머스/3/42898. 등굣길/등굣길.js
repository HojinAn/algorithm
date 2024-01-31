const MOD = 1000000007;

function solution(m, n, puddles) {
    const visited = puddles.reduce((visited, [c, r]) => {
        visited[r - 1][c - 1] = true;
        return visited;
    }, [...Array(n)].map(() => Array(m).fill(false)));
    const dp = [...Array(n)].map(() => Array(m).fill(0));
    
    dp[0][0] = 1;
    visited[0][0] = true;
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            if (visited[r][c]) {
                continue;
            }
            dp[r][c] = ((c > 0 ? dp[r][c - 1] : 0) + (r > 0 ? dp[r - 1][c] : 0)) % MOD;
        }
    }

    return dp[n - 1][m - 1];
}