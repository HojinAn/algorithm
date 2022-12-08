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

const q = new Queue<number[]>();
q.push([n]);
let ans = <number[]>[];
if (n >= k) {
  for (let i = n; i >= k; i--) ans.push(i);
} else {
  while (q.size()) {
    const curArr = q.shift()!;
    const cur = curArr[curArr.length - 1];
    visited[cur] = true;
    if (cur === k) {
      ans = curArr;
      break;
    }
    const pushNext = (arr: number[]) => (f: (number) => number) => {
      const next = f(cur);
      next >= 0 &&
        next <= MAX_UNDER &&
        !visited[next] &&
        q.push([...arr, next]);
    };
    [(n) => n * 2, (n) => n + 1, (n) => n - 1].forEach(pushNext(curArr));
  }
}

console.log(ans.length - 1);
console.log(ans.join(' '));
