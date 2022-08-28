import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

class Node {
  no: number;
  val: number;
  children: Node[];
  parents: Node[];
  visited: boolean;
  constructor(no: number, val: number) {
    this.no = no;
    this.val = val;
    this.children = [];
    this.parents = [];
    this.visited = false;
  }
}

let idx = 0;
let T = +inp[idx++];
let answer = "";
while (T--) {
  const [n, k] = inp[idx++].trim().split(" ").map(Number);
  const nodes = inp[idx++]
    .trim()
    .split(" ")
    .map((el, i) => new Node(i, +el));
  inp.slice(idx, (idx += k)).forEach((li) => {
    const [child, parent] = li
      .trim()
      .split(" ")
      .map((el) => +el - 1);
    nodes[child].parents.push(nodes[parent]);
    nodes[parent].children.push(nodes[child]);
  });
  const w = +inp[idx++] - 1;
  const treeDP = (num: number) => {
    if (nodes[num].visited) return;
    let max = 0;
    nodes[num].children.forEach((node) => {
      const { no } = node;
      node.children.length && treeDP(no);
      max = Math.max(max, nodes[no].val);
    });
    nodes[num].val += max;
    nodes[num].visited = true;
  };
  treeDP(w);
  answer += `${nodes[w].val}\n`;
}
console.log(answer.trim());
