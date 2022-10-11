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
const [[, m], nums] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(BigInt));

const pq = new PriorityQueue();
nums.forEach((el) => pq.add(new PQNode(el)));
for (let i = 0; i < Number(m); i++) {
  const sum = pq.poll()!.val + pq.poll()!.val;
  pq.add(new PQNode(sum));
  pq.add(new PQNode(sum));
}
let ans = BigInt(0);
while (pq.size()) ans += pq.poll().val;

console.log(`${ans}`);
