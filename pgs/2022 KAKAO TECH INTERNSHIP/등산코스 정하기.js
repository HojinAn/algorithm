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
  shift = () => {
    if (!this.head) return null;
    const popped = this.head;
    this.head = this.head.next;
    popped.next = undefined;
    if (!this.head) this.tail = undefined;
    this.length--;
    return popped.val;
  };
}
function solution(n, paths, gates, summits) {
  const nodes = [...Array(n + 1)].map(() => []);
  const set = new Set();
  const gatesArr = Array(n + 1).fill(false);
  const summitsArr = Array(n + 1).fill(false);
  summits.sort((a, b) => a - b);
  gates.sort((a, b) => a - b);
  gates.forEach((el) => (gatesArr[el] = true));
  summits.forEach((el) => (summitsArr[el] = true));
  paths.forEach(([i, j, w]) => {
    gatesArr[j] || summitsArr[i] || nodes[i].push([j, w]);
    gatesArr[i] || summitsArr[j] || nodes[j].push([i, w]);
    set.add(w);
  });
  nodes.forEach((_, i) =>
    nodes[i].sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]))
  );
  const answer = [50001, 10000001];
  const targets = Array.from(set).sort((a, b) => a - b);
  const bfs = (limit) => {
    const q = new Queue();
    const visited = Array(n + 1).fill(false);
    const candidates = [];
    gates.forEach((el) => {
      q.push(el);
      visited[el] = true;
    });
    while (q.size()) {
      const cur = q.shift();
      for (const [next, w] of nodes[cur]) {
        if (limit >= w && !visited[next]) {
          visited[next] = true;
          if (summitsArr[next]) {
            candidates.push(next);
          }
          q.push(next);
        }
      }
    }
    if (candidates.length) {
      candidates.sort((a, b) => a - b);
      answer[0] = candidates[0];
      answer[1] = limit;
      return true;
    } else return false;
  };
  let l = 0,
    r = targets.length;
  while (l < r) {
    const mid = parseInt((l + r) / 2);
    bfs(targets[mid]) ? (r = mid) : (l = mid + 1);
  }
  return answer;
}
