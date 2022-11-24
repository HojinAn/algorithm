class Node<T> {
  val: T;
  next: Node<T> | null;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}
class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;

  constructor() {
    this.length = 0;
  }

  push(val: T) {
    const node = new Node(val);
    if (!this.head || !this.tail) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length += 1;
  }

  shift() {
    if (!this.head || !this.tail) return null;
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    if (!this.head) this.tail = null;
    this.length -= 1;
    return oldHead.val;
  }

  size() {
    return this.length;
  }

  peek() {
    return this.head;
  }
}
import * as fs from 'fs';
const [A, K] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const calc1 = (n: number) => n + 1;
const calc2 = (n: number) => n * 2;

const bfs = (from: number, to: number) => {
  const q = new Queue<[number, number]>();
  const visited = Array(to + 1).fill(false);
  q.push([from, 0]);
  visited[from] = true;
  while (q.size()) {
    const [cur, cnt] = q.shift()!;
    if (cur === to) return cnt;
    const next1 = calc1(cur);
    const next2 = calc2(cur);
    if (next1 <= to && !visited[next1]) {
      visited[next1] = true;
      q.push([next1, cnt + 1]);
    }
    if (next2 <= to && !visited[next2]) {
      visited[next2] = true;
      q.push([next2, cnt + 1]);
    }
  }
};
console.log(bfs(A, K));
