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

function solution(n, m, fires, ices) {
  fires = fires.map((li) => li.map((el) => el - 1));
  ices = ices.map((li) => li.map((el) => el - 1));
  const map = [...Array(n)].map(() =>
    [...Array(n)].map(() => [
      Array(fires.length).fill(0),
      Array(ices.length).fill(0),
    ])
  );
  let isFireFull = false;
  let isIceFull = false;
  const fireDir = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ];
  const iceDir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  const isInRange = (r, c) => 0 <= r && r < n && 0 <= c && c < n;
  const spreadFire = ([r, c], idx) => {
    const visited = [...Array(n)].map(() => Array(n).fill(false));
    const q = new Queue();
    q.push([r, c]);
    visited[r][c] = true;
    map[r][c][0][idx]++;
    while (q.size()) {
      const [cr, cc] = q.poll();
      fireDir.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (isInRange(nr, nc) && !visited[nr][nc]) {
          visited[nr][nc] = true;
          map[nr][nc][0][idx] > 0 && q.push([nr, nc]);
          map[nr][nc][0][idx]++;
        }
      });
    }
  };
  const spreadIce = ([r, c], idx) => {
    const visited = [...Array(n)].map(() => Array(n).fill(false));
    const q = new Queue();
    q.push([r, c]);
    visited[r][c] = true;
    map[r][c][1][idx]++;
    while (q.size()) {
      const [cr, cc] = q.poll();
      iceDir.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (isInRange(nr, nc) && !visited[nr][nc]) {
          visited[nr][nc] = true;
          map[nr][nc][1][idx] > 0 && q.push([nr, nc]);
          map[nr][nc][1][idx]++;
        }
      });
    }
  };
  let time;
  if (m >= 58) {
    time = 58;
  } else time = m;
  m -= time;
  while (time > 0 && !isFireFull && !isIceFull) {
    fires.forEach((el, i) => spreadFire(el, i));
    ices.forEach((el, i) => spreadIce(el, i));
    time--;
  }
  const diff = fires.length - ices.length;
  return map.map((li) =>
    li.map(([el1, el2]) => {
      const arr = [
        el1.reduce((acc, cur) => acc + cur),
        el2.reduce((acc, cur) => acc + cur),
      ];
      return arr[0] - arr[1] + m * diff;
    })
  );
}
