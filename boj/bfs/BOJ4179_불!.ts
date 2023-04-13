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
  _length: number;
  constructor() {
    this._length = 0;
    this.head = null;
    this.tail = null;
  }

  push(val: T) {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail!.next = node;
    this.tail = node;
    this._length++;
  }

  poll() {
    if (!this.head) return null;
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    if (!this.head) this.tail = null;
    this._length--;
    return oldHead.val;
  }

  isEmpty() {
    return !this._length;
  }

  size() {
    return this._length;
  }
}

const WALL = '#';
const JIHOON = 'J';
const FIRE = 'F';
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [R, C] = S.trim().split(' ').map(Number);
const grid = inp.map((li) => li.trim().split(''));

const fireQ = new Queue<number[]>();
const personQ = new Queue<number[]>();
const burned = [...Array(R)].map(() => Array(C).fill(false));
const visited = [...Array(R)].map(() => Array(C).fill(false));

const canBurn = ([r, c]: number[]) => {
  return grid[r][c] !== WALL && !burned[r][c];
};

const canVisit = ([r, c]: number[]) => {
  return grid[r][c] !== WALL && !visited[r][c] && !burned[r][c];
};

const makeItBurn = ([r, c]: number[]) => {
  visited[r][c] = true;
  burned[r][c] = true;
};

const isInRange = ([r, c]: number[]) => 0 <= r && r < R && 0 <= c && c < C;

const isEdge = ([r, c]: number[]) =>
  r === 0 || r === R - 1 || c === 0 || c === C - 1;

const bfs = () => {
  grid.forEach((li, r) =>
    li.forEach((el, c) => {
      switch (el) {
        case JIHOON:
          visited[r][c] = true;
          personQ.push([r, c, 0]);
          return;
        case FIRE:
          makeItBurn([r, c]);
          fireQ.push([r, c]);
          return;
        default:
          return;
      }
    })
  );

  while (!personQ.isEmpty() || !fireQ.isEmpty()) {
    let fireSize = fireQ.size();
    let personSize = personQ.size();
    while (fireSize--) {
      const [cr, cc] = fireQ.poll()!;
      DIR.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (isInRange([nr, nc]) && canBurn([nr, nc])) {
          makeItBurn([nr, nc]);
          fireQ.push([nr, nc]);
        }
      });
    }

    while (personSize--) {
      const [cr, cc, ct] = personQ.poll()!;
      const nt = ct + 1;
      if (isEdge([cr, cc])) return nt;
      DIR.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (isInRange([nr, nc]) && canVisit([nr, nc])) {
          visited[nr][nc] = true;
          personQ.push([nr, nc, nt]);
        }
      });
    }
  }

  return 'IMPOSSIBLE';
};

console.log(bfs());
