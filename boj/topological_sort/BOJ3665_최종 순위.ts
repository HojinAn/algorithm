import * as fs from 'fs';

class Node<T> {
  val: T;
  next: Node<T> | null;
  constructor(val: T) {
    this.val = val;
  }
}

class Queue<T> {
  head: Node<T> | null;
  tail: Node<T> | null;
  length: number;
  constructor() {
    this.length = 0;
  }

  poll() {
    if (!this.head) return null;
    const polled = this.head;
    this.head = polled.next;
    if (!this.head) this.tail = null;
    polled.next = null;
    this.length--;
    return polled.val;
  }

  push(val: T) {
    const node = new Node(val);
    !this.head ? (this.head = node) : (this.tail!.next = node);
    this.tail = node;
    this.length++;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return !this.length;
  }
}

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const IMPOSSIBLE = 'IMPOSSIBLE';

let T = Number(S);
let idx = 0;
const ans = <string[]>[];

while (T--) {
  const n = Number(inp[idx++]);
  const numbers = toNums(inp[idx++]);
  const m = Number(inp[idx++]);
  const pairs = inp.slice(idx, (idx += m)).map(toNums);
  ans.push(solution(n, numbers, pairs));
}

console.log(ans.join('\n'));

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}

function solution(n: number, numbers: number[], pairs: number[][]) {
  const indegrees = Array(n + 1).fill(-1);
  const rankInfo = [...Array(n + 1)].map(() => Array(n + 1).fill(false));
  let isMoreThanTwo = false;

  const getZeroIndegrees = () =>
    indegrees.reduce<number[]>(
      (zeros, no, i) => (no || zeros.push(i), zeros),
      []
    );

  const swapRank = ([from, to]: number[]) => {
    rankInfo[from][to] = false;
    rankInfo[to][from] = true;
    indegrees[from]++;
    indegrees[to]--;
  };

  const topologicalSort = () => {
    const q = new Queue<number>();
    const order = <number[]>[];

    getZeroIndegrees().forEach((no) => q.push(no));

    while (!q.isEmpty()) {
      if (q.size() > 1) isMoreThanTwo = true;
      const cur = q.poll()!;
      order.push(cur);
      rankInfo[cur].forEach((possible, to) => {
        if (possible) {
          rankInfo[cur][to] = false;
          if (--indegrees[to] === 0) q.push(to);
        }
      });
    }

    return order;
  };

  numbers.forEach((no, idx) => {
    indegrees[no] = idx;
    for (let i = idx + 1; i < n; i++) rankInfo[no][numbers[i]] = true;
  });
  pairs.forEach(([a, b]) => swapRank(rankInfo[a][b] ? [a, b] : [b, a]));

  const order = topologicalSort();

  return order.length < n ? IMPOSSIBLE : isMoreThanTwo ? '?' : order.join(' ');
}
