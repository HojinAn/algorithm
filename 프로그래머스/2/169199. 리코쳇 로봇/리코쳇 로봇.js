class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
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
const START = "R";
const GOAL = "G";
const WALL = "D";
const DIR = {
    'u': [-1, 0],
    'r': [0, 1],
    'd': [1, 0],
    'l': [0, -1],
}

function solution(board) {
    const [n, m] = [board.length, board[0].length];
    const checkIsInRange = ([r, c]) => 0 <= r && r < n && 0 <= c && c < m;
    
    board = board.map((li) => li.split(""));
    const visited = board.map(() => [...Array(m)].map(() => ({
        'l': false,
        'r': false,
        'u': false,
        'd': false,
    })))
    const q = new Queue();
    board.forEach((li, r) => li.forEach((el, c) => {
        if (el === START) {
            Object.keys(DIR).forEach((d) => {
                q.push([r, c, d, 0]);
                visited[r][c][d] = true;
            });
        }
    }))
    
    while (!q.isEmpty()) {
        let [r, c, d, cnt] = q.poll();
        if (board[r][c] === GOAL) {
            return cnt;
        }
        const [dr, dc] = DIR[d];
        while (true) {
            const [nr, nc] = [r + dr, c + dc];
            if (!checkIsInRange([nr, nc]) || board[nr][nc] === WALL || visited[nr][nc][d]) {
                break;
            }
            [r, c] = [nr, nc];
        }
        Object.keys(DIR).forEach((nd) => {
            q.push([r, c, nd, 0]);
            visited[r][c][nd] = true;
        });
    }
    return -1;
}