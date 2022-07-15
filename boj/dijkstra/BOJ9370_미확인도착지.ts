import * as fs from "fs";
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

class PriorityQueue {
  values: number[][];
  comparator: Function;
  constructor(comparator = (a: number[], b: number[]) => a[1] - b[1]) {
    this.values = [];
    this.comparator = comparator;
  }
  add(node: number[]) {
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
      let leftChild: number[] | undefined,
        rightChild: number[] | undefined,
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

const INF = Number.MAX_SAFE_INTEGER;
let idx = 0;
let T = +input1;
let candidates: number[],
  a,
  b,
  d,
  s,
  g,
  h,
  roads,
  n,
  m,
  t,
  answer = "",
  costs,
  visited,
  pq,
  res1,
  res2,
  res3;

const dijkstra = (start: number) => {
  costs = Array(n + 1).fill(INF);
  visited = Array(n + 1).fill(false);
  costs[start] = 0;
  pq = new PriorityQueue();
  pq.add([start, 0]);
  while (pq.size()) {
    const [cur, curCost] = pq.poll();
    if (!cur) break;
    visited[cur] = true;
    roads[cur].forEach((el) => {
      const [next, nextCost] = el;
      if (!visited[next] && costs[next] > curCost + nextCost) {
        costs[next] = curCost + nextCost;
        pq.add([next, costs[next]]);
      }
    });
  }
  return costs;
};

const solve = () => {
  candidates.forEach((d) => {
    const costsS = dijkstra(s);
    const costsG = dijkstra(g);
    const costsH = dijkstra(h);
    res1 = costsS[g] + costsG[h] + costsH[d];
    res2 = costsS[h] + costsH[g] + costsG[d];
    res3 = costsS[d];
    Math.min(res1, res2) === res3 && (answer += `${d} `);
  });
  answer += "\n";
};

while (T--) {
  [n, m, t] = input2[idx++].trim().split(" ").map(Number);
  roads = [...Array(n + 1)].map(() => []);
  [s, g, h] = input2[idx++].trim().split(" ").map(Number);
  input2.slice(idx, (idx += m)).map((el) => {
    [a, b, d] = el.trim().split(" ").map(Number);
    roads[a].push([b, d]);
    roads[b].push([a, d]);
  });
  for (let i = 1; i <= n; i++) roads[i].sort((a, b) => a[1] - b[1]);
  candidates = input2
    .slice(idx, (idx += t))
    .map(Number)
    .sort((a, b) => a - b);
  solve();
}

console.log(answer.trim());
