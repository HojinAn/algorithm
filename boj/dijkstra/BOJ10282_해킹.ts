class PQNode {
  val: any;
  priority: number;
  constructor(val, priority = val) {
    this.val = val;
    this.priority = priority;
  }
}
class PriorityQueue {
  values: PQNode[];
  comparator: Function;
  constructor(
    comparator = (a: PQNode, b: PQNode) => a?.priority - b?.priority
  ) {
    this.values = [];
    this.comparator = comparator;
  }
  add(node: PQNode) {
    this.values.push(node);
    this.bubbleUp();
  }
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (this.comparator(element, parent) >= 0) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }
  poll() {
    const retPQNode = this.values[0];
    const end = this.values.pop();
    if (this.values.length && end) {
      this.values[0] = end;
      this.sinkDown();
    }
    return retPQNode;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild: PQNode | undefined,
        rightChild: PQNode | undefined,
        swap = -1;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (this.comparator(leftChild, element) < 0) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === -1 && this.comparator(rightChild, element) < 0) ||
          (swap > -1 && this.comparator(rightChild, leftChild) < 0)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === -1) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
  size() {
    return this.values.length;
  }
  peek() {
    return this.values[0];
  }
}

import * as fs from "fs";
const [str1, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const INF = Number.MAX_SAFE_INTEGER;

const dijkstra = (start: number, nodes: number[][][], n: number) => {
  const times: number[] = Array(n + 1).fill(INF);
  const visited: boolean[] = Array(n + 1).fill(false);
  times[start] = 0;
  const pq = new PriorityQueue();
  pq.add(new PQNode([start, times[start]], times[start]));
  let cnt = 0,
    totalTime = 0;
  while (pq.size()) {
    const [cur, curTime] = pq.poll()!.val;
    if (!cur) break;
    if (!visited[cur]) {
      cnt++;
      totalTime = curTime;
    }
    visited[cur] = true;
    nodes[cur].forEach((el) => {
      const [next, nextTime] = el;
      if (!visited[next] && times[next] > curTime + nextTime) {
        times[next] = curTime + nextTime;
        pq.add(new PQNode([next, times[next]], times[next]));
      }
    });
  }
  return `${cnt} ${totalTime}\n`;
};

let TC = +str1;
let idx = 0;
let answer = "";
while (TC--) {
  const [n, d, c] = inp[idx++].trim().split(" ").map(Number);
  const nodes: number[][][] = [...Array(n + 1)].map(() => []);
  inp.slice(idx, (idx += d)).forEach((el) => {
    const [a, b, s] = el.trim().split(" ").map(Number);
    nodes[b].push([a, s]);
  });
  nodes.forEach((_, i) => nodes[i].sort((a, b) => a[1] - b[1]));
  answer += dijkstra(c, nodes, n);
}
console.log(answer.trim());
