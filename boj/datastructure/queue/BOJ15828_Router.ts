class Node {
  val: number;
  next?: Node;
  constructor(val: number) {
    this.val = val;
  }
}
class Queue {
  length: number;
  head?: Node;
  tail?: Node;
  maxSize: number;
  constructor(maxSize: number) {
    this.length = 0;
    this.maxSize = maxSize;
  }
  push(val: number) {
    if (this.length === this.maxSize) return;
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail!.next = node;
    this.tail = node;
    this.length++;
  }
  poll() {
    if (this.head) {
      const oldHead = this.head;
      this.head = this.head.next;
      oldHead.next = undefined;
      this.head || (this.tail = undefined);
      this.length--;
      return oldHead;
    }
    return undefined;
  }
}
import * as fs from "fs";
const [str1, ...infos] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const q = infos.reduce((q, str) => {
  const no = +str;
  switch (no) {
    case 0:
      q.poll();
    case -1:
      break;
    default:
      q.push(no);
      break;
  }
  return q;
}, new Queue(+str1));

const answer = <number[]>[];
while (q.length) answer.push(q.poll()!.val);
console.log(answer.join(" ") || "empty");
