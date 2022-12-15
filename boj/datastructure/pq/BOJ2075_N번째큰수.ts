class PriorityQueue {
  values: number[];
  comparator: Function;
  constructor(comparator = (a: number, b: number) => a - b) {
    this.values = [];
    this.comparator = comparator;
  }
  add(node: number) {
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
    const retnumber = this.values[0];
    const end = this.values.pop();
    if (this.values.length && end) {
      this.values[0] = end;
      this.sinkDown();
    }
    return retnumber;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild: number | undefined,
        rightChild: number | undefined,
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
import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const pq = new PriorityQueue();
let n: number;
rl.on('line', function (line) {
  if (n === undefined) n = Number(line);
  else {
    line
      .trim()
      .split(' ')
      .forEach((el) => {
        pq.add(+el);
        if (pq.size() > n) pq.poll();
      });
  }
}).on('close', function () {
  console.log(pq.poll());
  process.exit();
});
