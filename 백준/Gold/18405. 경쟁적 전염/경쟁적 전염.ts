import * as fs from 'fs';

class Node<T> {
  val: T;
  next: Node<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(val: T) {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail!.next = node;
    this.tail = node;
    this.size++;
  }

  dequeue() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    this.size--;
    return val;
  }

  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }
}

type Point = [number, number];

const DIR = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const bfs = (q: Queue<Point>) => {
  const nQ = new Queue<Point>();
  while (!q.isEmpty()) {
    const [r, c] = q.dequeue()!;
    for (const [dr, dc] of DIR) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nr >= n || nc < 0 || nc >= n || board[nr][nc]) continue;
      board[nr][nc] = board[r][c];
      nQ.enqueue([nr, nc]);
    }
  }
  return nQ;
};

const [s1, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [n] = s1.trim().split(' ').map(Number);
const [s, x, y] = inp.pop()!.trim().split(' ').map(Number);
const board = inp.map((v) => v.trim().split(' ').map(Number));

const q = new Queue<Point>();
const list = board.reduce((list, row, r) => {
  row.forEach((v, c) => v && list.push([v, [r, c]]));
  return list;
}, [] as [number, Point][]);
list.sort((a, b) => b[0] - a[0]);
while (list.length) {
  q.enqueue(list.pop()![1]);
}

[...Array(s)].reduce((q) => bfs(q), q);
console.log(board[x - 1][y - 1]);
