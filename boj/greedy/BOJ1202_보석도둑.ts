class PQNode {
  val: any;
  constructor(val) {
    this.val = val;
  }
}
class PriorityQueue {
  values: PQNode[];
  comparator: Function;
  constructor(comparator = (a: PQNode, b: PQNode) => a?.val - b?.val) {
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
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let index = 0;
const [n, k] = input[index++].split(" ").map(Number);
const jewels = input
  .slice(index, (index += n))
  .map((el) => el.split(" ").map(Number))
  .sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
const maxW = input
  .slice(index)
  .map(Number)
  .sort((a, b) => a - b);
const pq = new PriorityQueue((a, b) => b.val - a.val);
let ans = 0;
for (let i = 0, j = 0; i < k; i++) {
  while (j < n && jewels[j][0] <= maxW[i]) pq.add(new PQNode(jewels[j++][1]));
  if (pq.size()) ans += pq.poll().val;
}
console.log(ans);
