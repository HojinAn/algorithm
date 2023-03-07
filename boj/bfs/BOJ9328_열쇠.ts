import * as fs from 'fs';

const BLANK = '.';
const WALL = '*';
const DOCUMENT = '$';
const DIR = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

class Node<T> {
  val: T;
  next: Node<T> | null;
  constructor(val: T) {
    this.val = val;
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
    polled.next = null;
    if (!this.head) this.tail = null;
    this._length--;
    return polled.val;
  }

  isEmpty() {
    return !this._length;
  }

  size() {
    return this._length;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this._length = 0;
  }
}

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let T = Number(S);
let idx = 0;
const maxArr = <number[]>[];
while (T--) {
  const [h, w] = inp[idx++].trim().split(' ').map(Number);
  const buildingMap = inp
    .slice(idx, (idx += h))
    .map((li) => li.trim().split(''));
  const keys = inp[idx++].trim();
  const keySet = new Set<number>(
    keys === '0' ? [] : keys.split('').map(charToNum)
  );
  maxArr.push(solution([h, w], buildingMap, keySet));
}

console.log(maxArr.join('\n'));

function charToNum(str: string) {
  return str.charCodeAt(0) - 'a'.charCodeAt(0);
}

function solution(
  [h, w]: number[],
  buildings: string[][],
  keySet: Set<number>
) {
  const q = new Queue<[number, number]>();
  const visited = [...Array(h)].map<boolean[]>(() => Array(w).fill(false));
  let cnt = 0;

  const clearVisited = () => visited.forEach((_, i) => visited[i].fill(false));

  const checkIsKey = ([r, c]: number[]) => {
    const ch = buildings[r][c];
    return ch === ch.toLowerCase();
  };

  const checkInRange = ([r, c]: number[]) => 0 <= r && r < h && 0 <= c && c < w;

  const checkCanOpen = ([r, c]: number[]) =>
    keySet.has(charToNum(buildings[r][c].toLowerCase()));

  const toVisited = ([r, c]: number[]) => {
    q.push([r, c]);
    visited[r][c] = true;
  };

  const handleNext = ([nr, nc]: number[]) => {
    const next = buildings[nr][nc];
    switch (next) {
      case WALL:
        break;
      case DOCUMENT:
        cnt++;
        buildings[nr][nc] = BLANK;
      case BLANK:
        toVisited([nr, nc]);
        break;
      default:
        if (checkIsKey([nr, nc])) {
          keySet.add(charToNum(next));
          buildings[nr][nc] = BLANK;
          q.clear();
          clearVisited();
          boundaryPush();
        } else if (checkCanOpen([nr, nc])) toVisited([nr, nc]);
        break;
    }
  };

  function boundaryPush() {
    for (let r = 0; r < h; r++) handleNext([r, 0]), handleNext([r, w - 1]);
    for (let c = 0; c < w; c++) handleNext([0, c]), handleNext([h - 1, c]);
  }

  boundaryPush();

  while (!q.isEmpty()) {
    const [cr, cc] = q.poll()!;
    DIR.forEach(([dr, dc]) => {
      const [nr, nc] = [cr + dr, cc + dc];
      if (checkInRange([nr, nc]) && !visited[nr][nc]) handleNext([nr, nc]);
    });
  }

  return cnt;
}
