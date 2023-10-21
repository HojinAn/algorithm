import * as fs from 'fs';

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
  _size: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  push(val: T) {
    const node = new Node(val);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }
    this.tail = node;
    this._size++;
  }

  poll() {
    if (!this.head) {
      return null;
    }
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    if (!this.head) {
      this.tail = null;
    }
    this._size--;
    return oldHead.val;
  }

  isEmpty() {
    return !this._size;
  }

  size() {
    return this._size;
  }
}

class BridgeNode {
  no: number;
  siblings: Bridge[];
  constructor(no: number) {
    this.no = no;
    this.siblings = [];
  }
}

class Bridge {
  to: number;
  length: number;
  constructor(to: number, length: number) {
    this.to = to;
    this.length = length;
  }
}

const [li, ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const [n] = li.trim().split(' ').map(Number);

const bridges = [...Array(n + 1)].map((_, n) => new BridgeNode(n));
const answer: number[] = [];

inp
  .slice(0, n - 1)
  .map(strToNums)
  .forEach(setBridge);

inp
  .slice(n - 1)
  .map(strToNums)
  .map(getLength)
  .forEach((len) => answer.push(len));

console.log(answer.join('\n'));

function strToNums(li: string) {
  return li.trim().split(' ').map(Number);
}

function setBridge([from, to, length]: number[]) {
  const bridgeA = new Bridge(to, length);
  const bridgeB = new Bridge(from, length);
  bridges[from].siblings.push(bridgeA);
  bridges[to].siblings.push(bridgeB);
}

function getLength([from, to]: number[]) {
  const visited = Array(n + 1).fill(false);
  const q = new Queue<[number, number]>();
  q.push([from, 0]);
  visited[from] = true;

  while (!q.isEmpty()) {
    const [a, len] = q.poll()!;
    if (a === to) {
      return len;
    }
    bridges[a].siblings.forEach(({ length, to }) => {
      if (!visited[to]) {
        visited[to] = true;
        q.push([to, len + length]);
      }
    });
  }

  return 0;
}
