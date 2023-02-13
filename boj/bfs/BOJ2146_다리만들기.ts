import * as fs from 'fs';

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
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val: T) {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail!.next = node;
    this.tail = node;
    this.length++;
  }

  poll() {
    if (!this.head) return null;
    const polled = this.head!;
    this.head = polled.next;
    if (!this.head) this.tail = null;
    polled.next = null;
    this.length--;
    return polled.val;
  }

  isEmpty() {
    return !this.length;
  }

  size() {
    return this.length;
  }
}

type Point = [number, number];

const solve = (n: number, initMap: number[][]) => {
  const ISLAND = 1;
  const WATER = 0;
  const DIR = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const INF = Number.MAX_SAFE_INTEGER;
  let ans = INF;

  const genVisited = () => [...Array(n)].map(() => Array(n).fill(false));
  const alreadyVisited = genVisited();

  const checkUnvisitedIsland = ([r, c]: Point) =>
    initMap[r][c] === ISLAND && !alreadyVisited[r][c];
  const checkRange = ([r, c]: Point) => 0 <= r && r < n && 0 <= c && c < n;

  const bfs = (point: Point) => {
    const [ri, ci] = point;
    const visited = genVisited();
    const q = new Queue<Point>();
    const boundaryQ = new Queue<[Point, number]>();
    let min = INF;
    q.push(point);
    visited[ri][ci] = true;
    alreadyVisited[ri][ci] = true;
    while (!q.isEmpty()) {
      const [cr, cc] = q.poll()!;
      DIR.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (checkRange([nr, nc]) && !visited[nr][nc]) {
          visited[nr][nc] = true;
          if (initMap[nr][nc] === ISLAND) {
            alreadyVisited[nr][nc] = true;
            q.push([nr, nc]);
          } else {
            boundaryQ.push([[nr, nc], 1]);
          }
        }
      });
    }
    while (!boundaryQ.isEmpty()) {
      const [[cr, cc], cnt] = boundaryQ.poll()!;
      DIR.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        const nCnt = cnt + 1;
        if (checkRange([nr, nc]) && !visited[nr][nc] && nCnt > cnt) {
          visited[nr][nc] = true;
          if (initMap[nr][nc] === ISLAND) {
            min = Math.min(cnt, min);
          } else {
            boundaryQ.push([[nr, nc], nCnt]);
          }
        }
      });
    }
    return min;
  };

  initMap.forEach((li, r) => {
    li.forEach((el, c) => {
      if (checkUnvisitedIsland([r, c])) {
        ans = Math.min(ans, bfs([r, c]));
      }
    });
  });

  return ans;
};

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(S);
const initMap = inp.map((li) => li.trim().split(' ').map(Number));

console.log(solve(n, initMap));
