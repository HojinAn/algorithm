import * as fs from 'fs';

class Node<T> {
  val: T;
  next?: Node<T>;
  constructor(val: T) {
    this.val = val;
  }
}

class Queue<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;
  constructor() {
    this.length = 0;
  }

  push(val: T) {
    const node = new Node<T>(val);
    !this.head ? (this.head = node) : (this.tail!.next = node);
    this.tail = node;
    this.length++;
  }

  shift() {
    if (!this.head) return undefined;
    const popped = this.head;
    this.head = popped.next;
    !this.head && (this.tail = undefined);
    popped.next = undefined;
    this.length--;
    return popped.val;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return !this.length;
  }
}

const BLANK = '.';
const WALL = '*';
const PORTAL = 'C';

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [w, h] = S.trim().split(' ').map(Number);
const grid: (string | number)[][] = inp.map((li) => li.trim().split(''));

const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const checkRange = ([r, c]: number[]) => 0 <= r && r < h && 0 <= c && c < w;

const bfs = () => {
  const q = new Queue<[number, number]>();
  const visited = [...Array(h)].map(() => Array(w).fill(false));
  let curNo = -1;

  outer: for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      if (grid[r][c] === PORTAL) {
        q.push([r, c]);
        grid[r][c] = curNo;
        visited[r][c] = true;
        break outer;
      }
    }
  }

  while (!q.isEmpty()) {
    const [cr, cc] = q.shift()!;
    const curCnt = grid[cr][cc];
    if (typeof curCnt === 'string') continue;
    const nextCnt = curCnt + 1;
    for (const [dr, dc] of DIR) {
      let [nr, nc] = [cr + dr, cc + dc];
      while (checkRange([nr, nc])) {
        const next = grid[nr][nc];
        if (next === WALL) break;
        if (next === PORTAL) return nextCnt;
        if (next === BLANK) grid[nr][nc] = nextCnt;
        !visited[nr][nc] && q.push([nr, nc]);
        visited[nr][nc] = true;
        (nr += dr), (nc += dc);
      }
    }
  }
};

console.log(bfs());
