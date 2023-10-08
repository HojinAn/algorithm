import * as fs from 'fs';
const n = +fs.readFileSync('/dev/stdin').toString();

class Node<T> {
  data: T;
  next: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}

class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  push(data: T) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }
    this.tail = node;
    this.size++;
  }

  pollÏ() {
    if (this.head === null) return null;
    const oldHead = this.head;
    this.head = this.head.next;
    oldHead.next = null;
    if (this.head === null) this.tail = null;
    this.size--;
    return oldHead.data;
  }

  isEmpty() {
    return this.size === 0;
  }
}

const queue = new Queue<number>();

for (let i = 1; i <= n; i++) {
  queue.push(i);
}

const ans: number[] = [];

while (!queue.isEmpty()) {
  ans.push(queue.pollÏ()!);
  if (queue.isEmpty()) break;
  queue.push(queue.pollÏ()!);
}

console.log(ans.join(' '));
