function solution(maps) {
    const h = maps.length;
    const w = maps[0].length;
    const X = 'X';
    const visited = [...Array(h)].map(() => Array(w).fill(false));
    const DIR = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    const isInRange = ([r, c]) => 0 <= r && r < h && 0 <= c && c < w;
    
    const bfs = ([r, c], dayCnt) => {
        const q = [[r, c]];
        let qIdx = 0;
        let qSize = 1;
        while (qIdx < qSize) {
            const [cr, cc] = q[qIdx++];
            DIR.forEach(([dr, dc]) => {
                const [nr, nc] = [cr + dr, cc + dc];
                if (isInRange([nr, nc]) && maps[nr][nc] !== X && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    dayCnt += +maps[nr][nc]
                    q[qSize++] = [nr, nc];
                }
            })
        }
        
        return dayCnt;
    }
    
    const answer = maps.reduce((days, li, r) => {
        li.split('').forEach((el, c) => {
            if (el !== X && !visited[r][c]) {
                visited[r][c] = true;
                days.push(bfs([r, c], +el));
            }
        })
        return days;
    }, []);
    
    return !answer.length ? [-1] : answer.sort((a, b) => a - b);
}