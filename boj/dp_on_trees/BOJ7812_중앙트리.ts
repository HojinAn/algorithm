import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let idx = 0;
let answer = "";

class Node {
  no: number;
  link: Edge[];
  cost: number;
  constructor(no: number) {
    this.no = no;
    this.link = [];
    this.cost = 0;
  }
}

class Edge {
  to: number;
  w: number;
  constructor(to: number, w: number) {
    this.to = to;
    this.w = w;
  }
}

const solution = (n: number, nodes: Node[]) => {
  const costs = Array(n).fill(0);
  const cnts = Array(n).fill(0);
  let min = Infinity;

  const dfsForCostOfZero = (no: number) => {
    cnts[no] = 1;
    nodes[no].link.forEach((el) => {
      const { to, w } = el;
      if (!visited[to]) {
        visited[to] = 1;
        nodes[to].cost += nodes[no].cost + w;
        dfsForCostOfZero(to);
        cnts[no] += cnts[to];
      }
    });
    costs[0] += nodes[no].cost;
  };
  const dfsAllCosts = (no: number) => {
    min = Math.min(min, costs[no]);
    nodes[no].link.forEach((el) => {
      const { to, w } = el;
      if (!visited[to]) {
        visited[to] = 1;
        costs[to] = costs[no] - (2 * cnts[to] - n) * w;
        dfsAllCosts(to);
      }
    });
  };

  let visited = Array(n).fill(0);
  visited[0] = 1;
  dfsForCostOfZero(0);
  visited = Array(n).fill(0);
  visited[0] = 1;
  dfsAllCosts(0);

  answer += `${min}\n`;
};

while (1) {
  const n = +inputList[idx++].trim();
  if (!n) break;
  const nodes: Node[] = Array(n).fill(Node);
  for (let i = 0; i < n; i++) nodes[i] = new Node(i);
  inputList.slice(idx, idx + n - 1).forEach((el) => {
    const [a, b, w] = el.trim().split(" ").map(Number);
    nodes[a].link.push(new Edge(b, w));
    nodes[b].link.push(new Edge(a, w));
  });
  solution(n, nodes);
  idx += n - 1;
}

console.log(answer.trim());
