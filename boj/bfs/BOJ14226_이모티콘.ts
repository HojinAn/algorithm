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

type PlayNode = [number, number, number];

const emoticonProgram = (S: number) => {
  const q = new Queue<PlayNode>();
  const visited = [...Array(S + 1)].map(() =>
    Array<boolean>(S + 1).fill(false)
  );
  q.push([1, 0, 0]);
  visited[1][0] = true;

  while (!q.isEmpty()) {
    const [cur, curT, curBoard] = q.poll()!;
    if (cur === S) return curT;
    const nextT = curT + 1;
    /** copy */
    !visited[cur][cur] && q.push([cur, nextT, cur]);
    /** paste */
    let next = cur + curBoard;
    curBoard > 0 &&
      next <= S &&
      !visited[next][curBoard] &&
      ((visited[next][curBoard] = true), q.push([next, nextT, curBoard]));
    /** delete */
    next = cur - 1;
    cur > 2 &&
      !visited[next][curBoard] &&
      ((visited[next][curBoard] = true), q.push([next, nextT, curBoard]));
  }
};

const S = Number(fs.readFileSync('/dev/stdin').toString());
console.log(emoticonProgram(S));
