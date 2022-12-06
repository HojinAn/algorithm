import * as fs from 'fs';
const [li1, li2, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

class Node {
  no: number;
  cnt: number;
  links: Edge[];
  constructor(no: number) {
    this.no = no;
    this.links = [];
  }
}
class Edge {
  to: number;
  l: number;
  constructor(to: number, l: number) {
    this.to = to;
    this.l = l;
  }
}
class PQNode<T> {
  val: T;
  priority: number;
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}
class PriorityQueue<T> {
  values: PQNode<T>[];
  comparator: Function;
  constructor(
    comparator = (a: PQNode<T>, b: PQNode<T>) => a?.priority - b?.priority
  ) {
    this.values = [];
    this.comparator = comparator;
  }
  add(node: PQNode<T>) {
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
      let leftChild: PQNode<T> | undefined,
        rightChild: PQNode<T> | undefined,
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

const [n, m, r] = li1.trim().split(' ').map(Number);
const nodes = [...Array(n + 1)].map((_, i) => new Node(i));
[0, ...li2.trim().split(' ').map(Number)].forEach(
  (cnt, i) => (nodes[i].cnt = cnt)
);
input.forEach((li) => {
  const [from, to, l] = li.trim().split(' ').map(Number);
  nodes[from].links.push(new Edge(to, l));
  nodes[to].links.push(new Edge(from, l));
});
let max = 0;

const dijkstra = (start: number, ans = 0) => {
  const pq = new PriorityQueue<[Node, number]>();
  const visited = Array(n + 1).fill(false);
  pq.add(new PQNode([nodes[start], m], 0));
  while (pq.size()) {
    const [curNode, curRange] = pq.poll()!.val;
    const { cnt, links, no } = curNode;
    if (visited[no]) continue;
    visited[no] = true;
    ans += cnt;
    links.forEach(({ to, l }) => {
      if (curRange - l >= 0) {
        pq.add(new PQNode([nodes[to], curRange - l], l));
      }
    });
  }
  max = Math.max(max, ans);
};

nodes.forEach((_, i) => dijkstra(i));
console.log(max);
