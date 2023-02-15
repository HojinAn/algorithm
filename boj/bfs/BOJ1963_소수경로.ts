import * as fs from 'fs';

const IMPOSSIBLE = 'Impossible';

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
  _length: number;
  constructor() {
    this._length = 0;
  }

  push(val: T) {
    const node = new Node(val);
    !this.head ? (this.head = node) : (this.tail!.next = node);
    this.tail = node;
    this._length++;
  }

  poll() {
    if (!this.head) return null;
    const polled = this.head;
    this.head = polled.next;
    !this.head && (this.tail = null);
    polled.next = null;
    this._length--;
    return polled.val;
  }

  isEmpty() {
    return !this._length;
  }

  size() {
    return this._length;
  }
}

const checIsPrime = (no: number) => {
  if (no === 2) return true;
  if (no % 2 === 0) return false;
  for (let i = 3; i * i <= no; i += 2) if (no % i === 0) return false;
  return true;
};

const genNo = (cur: number) => (idx: number, no: number) => {
  if (idx === 0 && no === 0) return cur;
  const first = Math.floor(cur / 1000) * 1000;
  const second = Math.floor((cur % 1000) / 100) * 100;
  const third = Math.floor((cur % 100) / 10) * 10;
  const fourth = Math.floor(cur % 10);
  switch (idx) {
    case 0:
      return no * 1000 + second + third + fourth;
    case 1:
      return no * 100 + first + third + fourth;
    case 2:
      return no * 10 + first + second + fourth;
    case 3:
      return no + first + second + third;
  }
};

const bfs =
  (primeNoSet: Set<number>) =>
  ([from, to]: number[]) => {
    if (!primeNoSet.has(to)) return IMPOSSIBLE;

    const q = new Queue<[number, number]>();
    const visited = Array(10000).fill(false);
    q.push([from, 0]);
    visited[from] = true;

    while (!q.isEmpty()) {
      const [cur, cnt] = q.poll()!;
      if (cur === to) return cnt;
      const genFunc = genNo(cur);
      for (let i = 0; i < 4; i++) {
        for (let no = 0; no < 10; no++) {
          const next = genFunc(i, no)!;
          if (primeNoSet.has(next) && !visited[next]) {
            visited[next] = true;
            q.push([next, cnt + 1]);
          }
        }
      }
    }
    return IMPOSSIBLE;
  };

const [, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const primeNoSet = new Set<number>();

for (let i = 1001; i < 10000; i += 2) checIsPrime(i) && primeNoSet.add(i);

const bfsPrimeNo = bfs(primeNoSet);

console.log(
  inp
    .reduce<('Impossible' | number)[]>(
      (ans, li) => (
        ans.push(bfsPrimeNo(li.trim().split(' ').map(Number))), ans
      ),
      []
    )
    .join('\n')
);
