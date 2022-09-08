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
  constructor() {
    this.length = 0;
  }
  push(val: number) {
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
const [, ...arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" "));
const queue = new Queue();
let answer = "";
arr.forEach(([order, num]) => {
  const len = queue.length;
  switch (order) {
    case "push":
      queue.push(+num);
      break;
    case "pop":
      answer += `${queue.poll()?.val ?? -1}\n`;
      break;
    case "size":
      answer += `${len}\n`;
      break;
    case "empty":
      answer += `${len ? 0 : 1}\n`;
      break;
    case "front":
      answer += `${queue.head?.val ?? -1}\n`;
      break;
    case "back":
      answer += `${queue.tail?.val ?? -1}\n`;
      break;
  }
});
console.log(answer.trim());
