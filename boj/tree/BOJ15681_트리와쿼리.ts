class Node {
  val: number;
  children: Node[];
  links: Node[];
  nodeCnt: number;
  constructor(val: number) {
    this.val = val;
    this.children = [];
    this.links = [];
    this.nodeCnt = 1;
  }
}
import * as fs from "fs";
const [[n, r, q], ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const edges = inp.slice(0, n - 1);
const nodeInfos = inp.slice(n - 1).map(([el]) => el);

const nodes = [...Array(n + 1)].map((_, i) => new Node(i));
const visited = Array(n + 1).fill(false);

edges.forEach(([u, v]) => {
  nodes[u].links.push(nodes[v]);
  nodes[v].links.push(nodes[u]);
});

const makeTree = (no: number) => {
  const { links, children } = nodes[no];
  while (links.length) {
    const node = links.pop()!;
    const { val } = node;
    visited[val] || ((visited[val] = true), children.push(node), makeTree(val));
  }
};
const countDfs = (no: number) =>
  nodes[no].children.length &&
  nodes[no].children.forEach(
    (node) => (countDfs(node.val), (nodes[no].nodeCnt += node.nodeCnt))
  );

visited[r] = true;
makeTree(r);
countDfs(r);

console.log(
  nodeInfos.reduce((acc, cur) => `${acc}\n${nodes[cur].nodeCnt}`, "").trim()
);
