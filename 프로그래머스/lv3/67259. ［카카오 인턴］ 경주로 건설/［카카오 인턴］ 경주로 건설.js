class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }
    
    push(val) {
        const node = new Node(val);
        if (!this.head) this.head = node;
        else this.tail.next = node;
        this.tail = node;
        this.length++;
    }
    
    poll() {
        if (!this.head) return null;
        const oldHead = this.head;
        this.head = oldHead.next;
        oldHead.next = null;
        if (!this.head) this.tail = null;
        this.length--;
        return oldHead.val;
    }
    
    size() {
        return this.length;
    }
    
    isEmpty() {
        return !this.length;
    }
}

function solution(board) {
    const n = board.length;
    const INF = Number.MAX_SAFE_INTEGER;
    const cache = [...Array(n)].map(() => [...Array(n)].map(() => ({E:INF,S:INF,N:INF,W:INF})));
    return bfs(board, cache, n);
}

function bfs(board, cache, n) {
    const DIR = {
        N: [-1, 0],
        E: [0, 1],
        S: [1, 0], 
        W: [0, -1]
    };
    
    const isInRange = ([r, c]) => 0 <= r && r < n && 0 <= c && c < n;
    
    const q = new Queue();
    if (!board[1][0]) {
        q.push([1, 0, 'S']);
        cache[1][0]['S'] = 100;
    }
    if (!board[0][1]) {
        q.push([0, 1, 'E']);
        cache[0][1]['E'] = 100;
    }
    
    while (!q.isEmpty()) {
        const [cr, cc, cd] = q.poll();
        Object.keys(DIR).forEach((d) => {
            const [dr, dc] = DIR[d];
            const [nr, nc] = [cr + dr, cc + dc];
            if (isInRange([nr, nc]) && !board[nr][nc]) {
                const cost = cd === d ? 100 : 600;
                if (cache[nr][nc][d] > cache[cr][cc][cd] + cost) {
                    cache[nr][nc][d] = cache[cr][cc][cd] + cost;
                    q.push([nr, nc, d]);
                }
            }
        })
    }
    
    return Math.min(...Object.values(cache[n - 1][n - 1]));
}