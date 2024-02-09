class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class Queue {
    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }
    push(val) {
        const node = new Node(val);
        if (!this.head) {
            this.head = node;
        } else {
            this.tail.next = node;
        }
        this.tail = node;
        this.size++;
    }
    poll() {
        if (!this.head) {
            return null;
        }
        const polled = this.head;
        this.head = polled.next;
        polled.next = null;
        if (!this.head) {
            this.tail = null;
        }
        this.size--;
        return polled.val;
    }
    isEmpty() {
        return !this.size;
    }
}
const START = 'S';
const EXIT = 'E';
const LEVER = 'L';
const OK = 'O';
const X = 'X';
const DIR = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
]
function solution(maps) {
    maps = maps.map((li) => li.split(''));
    const q = new Queue();
    const visited = maps.map((li) => li.map(() => [false, false]));
    const n = maps.length;
    const m = maps[0].length;
    const isInRange = ([r, c]) => 0 <= r && r < n && 0 <= c && c < m;
    
    maps.forEach((li, r) => li.forEach((el, c) => {
        if (el === START) {
            q.push([r, c, 0, 0]);
            visited[r][c][0] = true;
        }
    }))
    
    while (!q.isEmpty()) {
        const [r, c, i, cnt] = q.poll();
        if (maps[r][c] === EXIT && i === 1) {
            return cnt;
        }
        DIR.forEach(([dr, dc]) => {
            const [nr, nc] = [r + dr, c + dc];
            if (isInRange([nr, nc]) && !visited[nr][nc][i]) {
                if (maps[nr][nc] === X) {
                    return;
                }
                q.push([nr, nc, i, cnt + 1]);
                visited[nr][nc][i] = true;
                if (i === 0) {
                    if (maps[nr][nc] === LEVER) {
                        q.push([nr, nc, 1, cnt + 1]);
                        visited[nr][nc][1] = true;
                    }
                }
            }
        });
    }
    return -1;
}