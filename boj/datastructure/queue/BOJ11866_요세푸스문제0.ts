class Node {
  val: number;
  next?: Node;
  constructor(val: number) {
    this.val = val;
  }
}
class Queue {
  private head?: Node;
  private tail?: Node;
  private _length: number;
  constructor() {
    this._length = 0;
  }
  size = () => this._length;
  add = (val: number) => {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail!.next = node;
    this.tail = node;
    this._length++;
  };
  poll = () => {
    if (!this.head) return undefined;
    const oldHead = this.head;
    this.head = oldHead.next;
    if (!this.head) this.tail = undefined;
    oldHead.next = undefined;
    this._length--;
    return oldHead.val;
  };
}

import * as fs from "fs";
const [n, k] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const q = new Queue();
const ans: number[] = [];
let cnt = 0;

for (let i = 1; i <= n; i++) q.add(i);

while (q.size()) {
  const poll = q.poll()!;
  cnt %= n;
  if (++cnt === k) ans.push(poll), (cnt = 0);
  else q.add(poll);
}

console.log(`<${ans.join(", ")}>`);
