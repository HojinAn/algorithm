import * as fs from 'fs';

class Node {
  no: number;
  children: number[];
  indegree: number;
  constructor(no: number) {
    this.no = no;
    this.children = [];
    this.indegree = 0;
  }
}

class PriorityQueue {
  items: number[];
  comparator: (a: number, b: number) => boolean;
  constructor(comparator = (a: number, b: number) => a < b) {
    this.items = [];
    this.comparator = comparator;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }

  getLeftChildIdx(parentIndex: number) {
    return parentIndex * 2 + 1;
  }

  getRightChildIdx(parentIndex: number) {
    return parentIndex * 2 + 2;
  }

  getParentIdx(idx: number) {
    return Math.floor((idx - 1) / 2);
  }

  swap(a: number, b: number) {
    const tmp = this.items[a];
    this.items[a] = this.items[b];
    this.items[b] = tmp;
  }

  peek() {
    return this.items[0];
  }

  push(no: number) {
    this.items.push(no);
    this.heapifyUp();
  }

  heapifyUp() {
    let idx = this.items.length - 1;
    let parentIdx = this.getParentIdx(idx);

    while (
      parentIdx >= 0 &&
      this.comparator(this.items[idx], this.items[parentIdx])
    ) {
      this.swap(idx, parentIdx);
      idx = parentIdx;
      parentIdx = this.getParentIdx(idx);
    }
  }

  poll() {
    if (this.size() < 2) return this.items.pop();
    const root = this.peek();
    this.items[0] = this.items.pop()!;
    this.heapifyDown();
    return root;
  }

  heapifyDown() {
    let idx = 0;
    const count = this.items.length;
    let lIdx = this.getLeftChildIdx(idx);
    let rIdx = this.getRightChildIdx(idx);
    while (lIdx < count) {
      const childIdx =
        rIdx < count && this.comparator(this.items[rIdx], this.items[lIdx])
          ? rIdx
          : lIdx;
      if (this.comparator(this.items[idx], this.items[childIdx])) break;
      this.swap(idx, childIdx);

      idx = childIdx;
      lIdx = this.getLeftChildIdx(idx);
      rIdx = this.getRightChildIdx(idx);
    }
  }
}

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = toNums(S);
const nodes = [...Array(n)].map((_, i) => new Node(i));
inp.forEach((li) => {
  const [u, v] = toNums(li).map((x) => x - 1);
  nodes[u].children.push(v);
  nodes[v].indegree++;
});

nodes.forEach((node) => node.children.sort((a, b) => a - b));
const startNodes = nodes.filter(({ indegree }) => !indegree);

console.log(topology(startNodes).join(' '));

function topology(startNodes: Node[]) {
  const answer = <number[]>[];
  const q = new PriorityQueue();
  startNodes.forEach(({ no }) => q.push(no));

  while (q.size()) {
    const cur = q.poll()!;
    answer.push(cur + 1);
    nodes[cur].children.forEach((next) => {
      nodes[next].indegree--;
      if (!nodes[next].indegree) q.push(next);
    });
  }

  return answer;
}

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}
