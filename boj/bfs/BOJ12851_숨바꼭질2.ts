class Node<T> {
  val: T;
  next?: Node<T>;
  constructor(val: T) {
    this.val = val;
  }
}
class Queue<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number;
  constructor() {
    this.length = 0;
  }
  push(val: T) {
    const node = new Node<T>(val);
    !this.head ? (this.head = node) : (this.tail!.next = node);
    this.tail = node;
    this.length++;
  }
  shift() {
    if (!this.head) return undefined;
    const popped = this.head;
    this.head = popped.next;
    !this.head && (this.tail = undefined);
    popped.next = undefined;
    this.length--;
    return popped.val;
  }
  size = () => this.length;
}
import * as fs from 'fs';
const [n, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const MAX_UNDER = 100001;
const visited = Array(MAX_UNDER).fill(false);

const q = new Queue<[number, number]>();
q.push([n, 0]);
let min = Number.MAX_VALUE;
let ans = 0;
if (n >= k) {
  min = n - k;
  ans = 1;
} else {
  while (q.size()) {
    const [cur, curT] = q.shift()!;
    visited[cur] = true;
    if (cur === k) {
      if (curT < min) min = curT;
      if (curT === min) ans++;
      else break;
    }
    let next = cur * 2;
    next >= 0 &&
      next <= MAX_UNDER &&
      !visited[next] &&
      q.push([next, curT + 1]);
    next = cur + 1;
    next >= 0 &&
      next <= MAX_UNDER &&
      !visited[next] &&
      q.push([next, curT + 1]);
    next = cur - 1;
    next >= 0 &&
      next <= MAX_UNDER &&
      !visited[next] &&
      q.push([next, curT + 1]);
  }
}

console.log(min);
console.log(ans);
