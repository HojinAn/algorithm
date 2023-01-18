import * as fs from "fs";
const [S, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let T = Number(S);
let idx = 0;
const INF = 100000000;

const toNums = (str: string) => str.trim().split(" ").map(Number);
const solve = (nodes: number[][], n: number) => {
  for (let via = 1; via <= n; via++) {
    for (let from = 1; from <= n; from++) {
      for (let to = 1; to <= n; to++) {
        if (nodes[from][to] > nodes[from][via] + nodes[via][to])
          nodes[from][to] = nodes[from][via] + nodes[via][to];
        if (from === to && nodes[from][to] < 0) return "YES";
      }
    }
  }
  for (let i = 1; i <= n; i++) if (nodes[i][i]) return "YES";
  return "NO";
};

const ans: string[] = [];
while (T--) {
  const [n, m, w] = toNums(inp[idx++]);
  const nodes = [...Array(n + 1)].map(() => Array(n + 1).fill(INF));
  for (let i = 1; i <= n; i++) nodes[i][i] = 0;
  inp.slice(idx, (idx += m)).forEach((li) => {
    const [s, e, t] = toNums(li);
    nodes[s][e] = Math.min(nodes[s][e], t);
    nodes[e][s] = Math.min(nodes[e][s], t);
  });
  inp.slice(idx, (idx += w)).forEach((li) => {
    const [s, e, t] = toNums(li);
    nodes[s][e] = Math.min(nodes[s][e], -t);
  });
  ans.push(solve(nodes, n));
}
console.log(ans.join("\n"));
