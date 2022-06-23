import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Node {
  val: number;
  parent: Node[];
  children: Node[];
  constructor(val) {
    this.val = val;
    this.children = [];
    this.parent = [];
  }
}

const [nm, ...str] = inputList;
const [n, m] = nm.trim().split(" ").map(Number);
let answer = "";
const nodes: Node[] = Array(n + 1).fill(Node);
for (let i = 1; i <= n; i++) nodes[i] = new Node(i);
str.forEach((el) => {
  const [a, b] = el.trim().split(" ").map(Number);
  nodes[a].children.push(nodes[b]);
  nodes[b].parent.push(nodes[a]);
});
const startList = nodes.slice(1).filter((el) => !el.children.length);
const visited = Array(n + 1).fill(0);
const dfs = (cur: Node) => {
  visited[cur.val] = 1;
  cur.parent.forEach((el) => {
    if (!visited[el.val]) dfs(el);
  });
  answer += `${cur.val} `;
};

startList.forEach((el) => dfs(el));
console.log(answer.trim());
