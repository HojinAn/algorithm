class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  size = () => this.length;
  push = (val) => {
    const node = new Node(val);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  };
  poll = () => {
    if (!this.head) return null;
    const oldHead = this.head;
    this.head = oldHead.next;
    oldHead.next = null;
    if (!this.head) this.tail = null;
    this.length--;
    return oldHead.val;
  };
}
function solution(begin, target, words) {
  const compare = (a, b) => {
    const arrA = a.split("");
    const arrB = b.split("");
    let cnt = 0;
    arrA.forEach((el, i) => el !== arrB[i] && cnt++);
    return cnt === 1;
  };
  const q = new Queue();
  q.push({ cur: begin, visited: Array(words.length).fill(false), cnt: 0 });
  while (q.size()) {
    const { cur, visited, cnt } = q.poll();
    if (cur === target) return cnt;
    words.forEach((next, i) => {
      if (!visited[i] && compare(cur, next)) {
        const nextVisited = [...visited];
        nextVisited[i] = true;
        q.push({ cur: next, visited: nextVisited, cnt: cnt + 1 });
      }
    });
  }
  return 0;
}
