class Bridge {
  to: number;
  weight: number;
  constructor(to: number, weight: number) {
    this.to = to;
    this.weight = weight;
  }
}
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
  size = () => this.length;
  add = (T: T) => {
    const node = new Node(T);
    if (!this.head || !this.tail) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  };
  poll = () => {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    if (!this.head) this.tail = undefined;
    oldHead.next = undefined;
    this.length--;
    return oldHead;
  };
}

import * as fs from "fs";
const [[n, m], ...info] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const [a, b] = info.pop()!;
let l = Number.MAX_SAFE_INTEGER,
  r = 0;
const bridges: Bridge[][] = [...Array(n + 1)].map(() => []);
info.forEach(([u, v, w]) => {
  r = Math.max(r, w);
  l = Math.min(l, w);
  bridges[u].push(new Bridge(v, w));
  bridges[v].push(new Bridge(u, w));
});

const bfs = (from: number, to: number, limit: number) => {
  const q = new Queue<number>();
  const visited = Array(n + 1).fill(false);

  visited[from] = true;
  q.add(from);

  while (q.size()) {
    const cur = q.poll()!.val;
    if (cur === to) return true;
    else
      bridges[cur].forEach(({ to: next, weight }) => {
        if (weight >= limit && !visited[next]) {
          visited[next] = true;
          q.add(next);
        }
      });
  }
  return false;
};

let ans = 0;
while (l <= r) {
  const mid = Math.floor((l + r) / 2);
  bfs(a, b, mid) ? ((l = mid + 1), (ans = mid)) : (r = mid - 1);
}
console.log(ans);
