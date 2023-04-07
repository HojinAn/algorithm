function solution(n, wires) {
    const nodes = [...Array(n + 1)].map(() => []);
    const visited = Array(n + 1).fill(false);
    wires.forEach(([u, v]) => {
        nodes[u].push(v);
        nodes[v].push(u);
    })
    
    const dfs = (no, d = 1) => {
        for (const next of nodes[no]) {
            if (!visited[next]) {
                visited[next] = true;
                d += dfs(next);
            }
        }
        return d;
    }
    
    return wires.reduce((min, [u, v], i) => {
        visited.fill(false);
        visited[u] = true;
        visited[v] = true;
        return Math.min(min, Math.abs(dfs(u) - dfs(v)));
    }, n);
}