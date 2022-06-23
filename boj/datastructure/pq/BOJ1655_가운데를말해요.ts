import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Node {
  val: any;
  priority: number;
  constructor(val, priority = val) {
    this.val = val;
    this.priority = priority;
  }
}
class PriorityQueue {
  values: Node[];
  comparator: Function;
  constructor(comparator = (a: Node, b: Node) => a?.priority - b?.priority) {
    this.values = [];
    this.comparator = comparator;
  }
  enqueue(node: Node) {
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
  dequeue() {
    const retNode = this.values[0];
    const end = this.values.pop();
    if (this.values.length && end) {
      this.values[0] = end;
      this.sinkDown();
    }
    return retNode;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild: Node | undefined,
        rightChild: Node | undefined,
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

let answer = "";

const sayMid = (
  num: number,
  minHeap: PriorityQueue,
  maxHeap: PriorityQueue
) => {
  minHeap.size() === maxHeap.size()
    ? maxHeap.enqueue(new Node(num))
    : minHeap.enqueue(new Node(num));
  const swap = () => {
    const [minPeek, maxPeek] = [minHeap.dequeue(), maxHeap.dequeue()];
    minHeap.enqueue(maxPeek);
    maxHeap.enqueue(minPeek);
  };
  minHeap.peek()?.priority <= maxHeap.peek().priority && swap();
  answer += `${maxHeap.peek().val}\n`;
};

const [str1, ...str2] = input;
const n = +str1;
const minHeap = new PriorityQueue();
const maxHeap = new PriorityQueue((a, b) => b.priority - a.priority);
str2.forEach((el) => {
  sayMid(+el.trim(), minHeap, maxHeap);
});
console.log(answer.trim());
