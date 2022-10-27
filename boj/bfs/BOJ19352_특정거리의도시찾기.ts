import * as fs from "fs";
const [s1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

class Node<T> {
  val: T;
  next?: Node<T>;
  constructor(val: T) {
    this.val = val;
  }
}
class Queue<T> {
  private head?: Node<T>;
  private tail?: Node<T>;
  private length: number;
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

const [N, M, dist, start] = s1.trim().split(" ").map(Number);
const cities = [...Array(N + 1)].map(() => <number[]>[]);
const visited = Array(N + 1).fill(false);

input.forEach((el) => {
  const [from, to] = el.trim().split(" ").map(Number);
  cities[from].push(to);
});

const answer = <number[]>[];
const q = new Queue<[number, number]>();
visited[start] = true;
q.push([start, 0]);

while (q.size()) {
  const [cur, cnt] = q.shift()!;
  if (cnt > dist) break;
  cnt === dist && answer.push(cur);
  cities[cur].forEach(
    (next) => visited[next] || ((visited[next] = true), q.push([next, cnt + 1]))
  );
}

console.log(answer.sort((a, b) => a - b).join("\n") || -1);
