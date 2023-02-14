import * as fs from 'fs';

const N = 3;
const ZERO = '0';
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const idxToRC: Point[] = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

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
  }

  push(val: T) {
    const node = new Node(val);
    !this.head ? (this.head = node) : (this.tail!.next = node);
    this.tail = node;
    this._length++;
  }

  poll() {
    if (!this.head) return null;
    const polled = this.head;
    this.head = polled.next;
    if (!this.head) this.tail = null;
    polled.next = null;
    this._length--;
    return polled.val;
  }

  isEmpty() {
    return !this._length;
  }

  size() {
    return this._length;
  }
}

type Table = string;
type Point = [number, number];
type Pair = [Table, number];

const convertIdxToPoint = (idx: number) => idxToRC[idx];

const convertPointToIdx = ([r, c]: Point) => 3 * r + c;

const findZEROCoords = (table: Table) => convertIdxToPoint(table.indexOf(ZERO));

const swapTable = (table: Table, from: Point) => (to: Point) => {
  const idxFrom = convertPointToIdx(from)!;
  const idxTo = convertPointToIdx(to)!;
  if (idxFrom < idxTo) {
    return (
      table.slice(0, idxFrom) +
      table[idxTo] +
      table.slice(idxFrom + 1, idxTo) +
      table[idxFrom] +
      table.slice(idxTo + 1)
    );
  }
  return (
    table.slice(0, idxTo) +
    table[idxFrom] +
    table.slice(idxTo + 1, idxFrom) +
    table[idxTo] +
    table.slice(idxFrom + 1)
  );
};

const checkComplete = (table: Table, completed = '123456780') =>
  table === completed;

const checkRange = ([r, c]: Point) => 0 <= r && r < N && 0 <= c && c < N;

const table = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n')
  .map((li) => li.trim().split(' ').map(Number).join(''))
  .join('');

const q = new Queue<Pair>();
const visited = new Set<string>();
let ans = -1;

q.push([table, 0]);
visited.add(table);

while (!q.isEmpty()) {
  const [curTable, curCnt] = q.poll()!;
  if (checkComplete(curTable)) {
    ans = curCnt;
    break;
  }
  const [cr, cc] = findZEROCoords(curTable);
  const swapping = swapTable(curTable, [cr, cc]);
  const nCnt = curCnt + 1;
  DIR.forEach(([dr, dc]) => {
    const [nr, nc] = [cr + dr, cc + dc];
    if (checkRange([nr, nc])) {
      const next = swapping([nr, nc]);
      if (!visited.has(next)) {
        visited.add(next);
        q.push([next, nCnt]);
      }
    }
  });
}

console.log(ans);
