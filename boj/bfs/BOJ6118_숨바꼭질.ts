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
  size = () => this.length;
}
import * as fs from "fs";
const [[n, m], ...edges] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const nodes: number[][] = [...Array(n + 1)].map(() => []);
const dist: number[][] = [...Array(n + 1)].map((_, i) => [i, 0]);
let max = 0;
let maxCnt = 0;
edges.forEach(([from, to]) => {
  nodes[from].push(to);
  nodes[to].push(from);
});
nodes.forEach((_, i) => nodes[i].sort((a, b) => a - b));
(() => {
  const q = new Queue<number[]>();
  const visited = Array(n + 1).fill(false);
  visited[1] = true;
  q.push([1, 0]);
  while (q.size()) {
    const [cur, cnt] = q.shift()!;
    if (max < cnt) (max = cnt), (maxCnt = 1);
    else if (max === cnt) maxCnt++;
    nodes[cur].forEach((el) => {
      if (!visited[el]) {
        visited[el] = true;
        q.push([el, cnt + 1]);
        dist[el] = [el, cnt + 1];
      }
    });
  }
})();
dist.sort((a, b) => (b[1] === a[1] ? a[0] - b[0] : b[1] - a[1]));
console.log(`${dist[0].join(" ")} ${maxCnt}`);
