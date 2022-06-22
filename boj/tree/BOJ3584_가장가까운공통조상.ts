import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [str1, ...str2] = inputList;
let TC = +str1;
let index = 0;
let answer = "",
  visited;

class Node {
  no: number;
  children: Node[];
  parent: Node;
  lv: number;
  constructor(no: number) {
    this.no = no;
    this.children = [];
  }
}

const inpHandler = (input: string[]) => {
  const n = +str2[index];
  const edges: Node[] = Array(n + 1).fill(Node);
  for (let i = 1; i <= n; i++) edges[i] = new Node(i);
  let rootNo;
  str2.slice(index + 1, index + n).map((el) => {
    const [parent, child] = el.trim().split(" ").map(Number);
    edges[parent].children.push(edges[child]);
    edges[child].parent = edges[parent];
  });
  for (let i = 1; i <= n; i++) {
    if (!edges[i].parent) {
      rootNo = i;
      break;
    }
  }
  const target = str2[index + n].trim().split(" ").map(Number);
  return { n, edges, target, rootNo };
};

const dfs = (no: number, edges: Node[], depth: number) => {
  edges[no].lv = depth;
  const children = edges[no].children;
  if (!children) return;
  children.forEach((nextNode) => {
    const next = nextNode.no;
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next, edges, depth + 1);
    }
  });
};

const findAncestor = (target: number[], edges: Node[]) => {
  let leafA = edges[target[0]];
  let leafB = edges[target[1]];
  let lvA = leafA.lv;
  let lvB = leafB.lv;
  while (lvA !== lvB) {
    if (lvA > lvB) {
      leafA = edges[leafA.no].parent;
      lvA = leafA.lv;
    } else {
      leafB = edges[leafB.no].parent;
      lvB = leafB.lv;
    }
  }
  while (leafA !== leafB) {
    leafA = edges[leafA.no].parent;
    leafB = edges[leafB.no].parent;
  }
  answer += `${leafA.no}\n`;
};

const solution = (
  n: number,
  edges: Node[],
  target: number[],
  rootNo: number
) => {
  visited = Array(n + 1).fill(0);
  dfs(rootNo, edges, 0);
  findAncestor(target, edges);
};

while (TC--) {
  const { n, edges, target, rootNo } = inpHandler(str2);
  solution(n, edges, target, rootNo);
  index += n + 1;
}

console.log(answer.trim());
