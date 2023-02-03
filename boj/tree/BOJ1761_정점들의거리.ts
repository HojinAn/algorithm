import * as fs from 'fs';

const MAX_DEPTH = 16;
const ROOT = 1;
class Edge {
  to: number;
  length: number;
  constructor(to: number, length: number) {
    this.to = to;
    this.length = length;
  }
}
class Node {
  no: number;
  link: Edge[];
  depth: number;
  fromRoot: number;
  constructor(no: number) {
    this.no = no;
    this.link = [];
    this.fromRoot = 0;
  }

  push(edge: Edge) {
    this.link.push(edge);
  }
}

const toNums = (str: string) => str.trim().split(' ').map(Number);

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(S);
const nodes = [...Array(n + 1)].map((_, i) => new Node(i));
const parents = [...Array(n + 1)].map(() => Array(MAX_DEPTH + 1).fill(0));

inp.slice(0, n - 1).forEach((li) => {
  const [from, to, length] = toNums(li);
  nodes[from].push(new Edge(to, length));
  nodes[to].push(new Edge(from, length));
});

makeTree();
fillParents();

console.log(
  inp
    .slice(n)
    .reduce<number[]>((ans, li) => (ans.push(solve(toNums(li))), ans), [])
    .join('\n')
);

function makeTree() {
  const visited = Array(n + 1).fill(false);
  const dfs = (cur: number, cNode = nodes[cur]) => {
    const link = cNode.link;
    const d = cNode.depth;
    while (link.length) {
      const next = link.pop()!;
      const { to, length } = next;
      if (!visited[to]) {
        visited[to] = true;
        nodes[to].depth = d + 1;
        nodes[to].fromRoot = cNode.fromRoot + length;
        dfs(to);
        parents[to][0] = cur;
      }
    }
  };
  visited[ROOT] = true;
  nodes[ROOT].depth = 0;
  dfs(ROOT);
}

function fillParents() {
  for (let anc = 1; anc <= MAX_DEPTH; anc++) {
    for (let no = 1; no <= n; no++) {
      parents[no][anc] = parents[parents[no][anc - 1]][anc - 1];
    }
  }
}

function solve([from, to]: number[]) {
  const findLCA = (cur = from, target = to) => {
    const [dCur, dTarget] = [cur, target].map((no) => nodes[no].depth);
    if (dCur < dTarget) [cur, target] = [target, cur];

    const targetLv = nodes[target].depth;
    for (let i = MAX_DEPTH; i >= 0; i--) {
      const ithParent = parents[cur][i];
      if (nodes[ithParent].depth >= targetLv) cur = ithParent;
    }

    if (cur === target) return target;

    for (let i = MAX_DEPTH; i >= 0; i--) {
      if (parents[cur][i] !== parents[target][i]) {
        cur = parents[cur][i];
        target = parents[target][i];
      }
    }
    return parents[target][0];
  };
  const lca = findLCA();
  return nodes[from].fromRoot + nodes[to].fromRoot - 2 * nodes[lca].fromRoot;
}
