class PQNode<T> {
  val: T;
  priority: number;
  constructor(val, priority = val) {
    this.val = val;
    this.priority = priority;
  }
}
class PriorityQueue<T> {
  heap: PQNode<T>[];
  comparator: Function;
  constructor(
    comparator = (a: PQNode<T>, b: PQNode<T>) => a?.priority - b?.priority
  ) {
    this.heap = [];
    this.comparator = comparator;
  }
  private getLeftChildIndex = (parentIndex: number) => parentIndex * 2 + 1;
  private getRightChildIndex = (parentIndex: number) => parentIndex * 2 + 2;
  private getParentIndex = (childIndex: number) =>
    Math.floor((childIndex - 1) / 2);

  peek = () => this.heap[0];

  push = (node: PQNode<T>) => {
    this.heap.push(node);
    this.heapifyUp();
  };
  private heapifyUp = () => {
    let index = this.heap.length - 1;
    const lastInsertedNode = this.heap[index];
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.comparator(lastInsertedNode, this.heap[parentIndex]) < 0) {
        this.heap[index] = this.heap[parentIndex];
        index = parentIndex;
      } else break;
    }
    this.heap[index] = lastInsertedNode;
  };

  poll = () => {
    const count = this.heap.length;
    const rootNode = this.heap[0];
    if (count <= 0) return undefined;
    if (count === 1) this.heap = [];
    else {
      this.heap[0] = this.heap.pop()!;
      this.heapifyDown();
    }
    return rootNode;
  };

  private heapifyDown = () => {
    let index = 0;
    const count = this.heap.length;
    const rootNode = this.heap[index];
    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      const smallerChildIndex =
        rightChildIndex < count &&
        this.comparator(this.heap[leftChildIndex], this.heap[rightChildIndex]) >
          0
          ? rightChildIndex
          : leftChildIndex;
      if (this.comparator(this.heap[smallerChildIndex], rootNode) <= 0) {
        this.heap[index] = this.heap[smallerChildIndex];
        index = smallerChildIndex;
      } else break;
    }
    this.heap[index] = rootNode;
  };
}

import * as fs from "fs";
const [str1, ...strArr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = +str1;
const map = strArr.map((el) => el.trim().split(""));
const INF = 25000;

const visited: number[][] = [...Array(n)].map(() => Array(n).fill(INF));
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const pq = new PriorityQueue<[number, number]>();
pq.push(new PQNode([0, 0], 0));
visited[0][0] = 0;

const isInRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < n;

while (pq.peek()) {
  const {
    val: [cr, cc],
    priority,
  } = pq.poll()!;
  if (priority > visited[cr][cc]) continue;
  for (const [dr, dc] of dir) {
    const [nr, nc] = [cr + dr, cc + dc];
    if (isInRange(nr, nc)) {
      const next = priority + (map[nr][nc] === "1" ? 0 : 1);
      if (next < visited[nr][nc]) {
        visited[nr][nc] = next;
        pq.push(new PQNode([nr, nc], next));
      }
    }
  }
}
console.log(visited[n - 1][n - 1]);
