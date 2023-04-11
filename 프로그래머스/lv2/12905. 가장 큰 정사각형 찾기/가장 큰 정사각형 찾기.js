function solution(board) {
    const h = board.length;
    const w = board[0].length;
    const n = Math.min(board.length, board[0].length);
    
    const cache = [...Array(h + 1)].map(()=>Array(w + 1).fill(0));
    cache[1][1] = board[0][0];
    for (let r = 1; r <= h; r++)
        for (let c = 1; c <= w; c++)
            cache[r][c] = cache[r - 1][c] + cache[r][c - 1] + board[r - 1][c - 1] - cache[r - 1][c - 1];
    
    for (let i = n; i >= 0; i--) if (isSqr(cache, i, h, w)) return i * i;
}

function isSqr(cache, size, h, w) {
    const area = size ** 2;
    
    for (let r = 0; r <= h - size; r++)
        for (let c = 0; c <= w - size; c++)
            if (cache[r + size][c + size] - cache[r][c + size] - cache[r + size][c] + cache[r][c] === area) return true;
    return false;
}