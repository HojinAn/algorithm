class Node {
  constructor(val, idx) {
    this.val = val;
    this.idx = idx;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }
  push(val, idx) {
    const node = new Node(val, idx);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  }
  poll() {
    if (!this.head) return undefiend;
    const oldHead = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    oldHead.next = null;
    this.length--;
    return oldHead;
  }
  size() {
    return this.length;
  }
}
function solution(progresses, speeds) {
  const n = speeds.length;
  const answer = [];
  const q = new Queue();
  progresses.forEach((el, idx) => q.push(el, idx));
  while (q.size()) {
    let size = q.size();
    const { val, idx } = q.poll();
    const sum = val + speeds[idx];
    let flag = sum >= 100;
    let cnt = flag ? 1 : 0;
    flag || q.push(sum, idx);
    while (--size) {
      const { val, idx } = q.poll();
      const sum = val + speeds[idx];
      if (sum < 100) {
        flag = false;
        q.push(sum, idx);
      } else flag ? cnt++ : q.push(sum, idx);
    }
    cnt && answer.push(cnt);
  }
  return answer;
}
