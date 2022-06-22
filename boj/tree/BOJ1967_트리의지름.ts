import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 이상 입력

const [str1, ...strN] = inputList;
const n = +str1.trim();
let answer = 0;

class Node {
  no: number;
  children: Array<Edge>;
  maxW: number;
  constructor(no: number) {
    this.no = no;
    this.children = [];
    this.maxW = 0;
  }
}

class Edge {
  to: Node;
  weight: number;
  constructor(to: Node, weight: number) {
    this.to = to;
    this.weight = weight;
  }
}

const nodeList: Array<Node> = Array(n + 1).fill(Node);
const visited = Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  nodeList[i] = new Node(i);
}

strN.forEach((el: string) => {
  const [parentNo, childNo, weight] = el.trim().split(" ").map(Number);
  nodeList[parentNo].children.push(new Edge(nodeList[childNo], weight));
});

const dfs = (no: number, nodeList: Array<Node>) => {
  const nextList = nodeList[no].children;
  if (!nextList.length) return;
  let maxW = 0;
  nextList.forEach((el: Edge) => {
    const nextNode = el.to;
    const next = nextNode.no;
    if (!visited[next]) {
      visited[next] = 1;
      dfs(next, nodeList);
      maxW = Math.max(maxW, el.weight + nextNode.maxW);
    }
  });
  nextList.sort((a, b) => b.to.maxW + b.weight - (a.to.maxW + a.weight));
  answer = Math.max(
    nextList.length
      ? nextList[0].to.maxW +
          nextList[0].weight +
          (nextList.length > 1 ? nextList[1].to.maxW + nextList[1].weight : 0)
      : 0,
    answer
  );
  nodeList[no].maxW = maxW;
};

dfs(1, nodeList);
console.log(answer);
