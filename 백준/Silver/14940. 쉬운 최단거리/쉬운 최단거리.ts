import * as fs from 'fs';
const [li, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

class Node<T> {
  val: T;
  next: Node<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class Queue<T> {
  _size: number;
  head: Node<T> | null;
  tail: Node<T> | null;
  constructor() {
    this._size = 0;
    this.head = null;
    this.tail = null;
  }

  push(val: T) {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail!.next = node;
    this.tail = node;
    this._size++;
  }

  poll() {
    if (!this.head) return null;
    const oldHead = this.head;
    this.head = this.head.next;
    oldHead.next = null;
    if (!this.head) this.tail = null;
    this._size--;
    return oldHead.val;
  }

  isEmpty() {
    return this._size === 0;
  }
}

const [n, m] = stringToNumbers(li);
const grid = inp
  .map(stringToNumbers)
  .map((li) => li.map((el) => (el === 1 ? -el : el)));
const visited = [...Array(n)].map(() => Array(m).fill(false));

const q = new Queue<[number, number]>();
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

grid.some((li, r) =>
  li.some((el, c) => el === 2 && (q.push([r, c]), (grid[r][c] = 0), true))
);

while (!q.isEmpty()) {
  const [cr, cc] = q.poll()!;
  DIR.forEach(([dr, dc]) => {
    const [nr, nc] = [cr + dr, cc + dc];
    if (checkIsRange(nr, nc) && !visited[nr][nc] && grid[nr][nc]) {
      visited[nr][nc] = true;
      grid[nr][nc] = grid[cr][cc] + 1;
      q.push([nr, nc]);
    }
  });
}

console.log(grid.map((li) => li.join(' ')).join('\n'));

function stringToNumbers(li: string) {
  return li.trim().split(' ').map(Number);
}

function checkIsRange(r: number, c: number) {
  return 0 <= r && r < n && 0 <= c && c < m;
}
