import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +inp[0];

const nodes: number[][] = [...Array(n + 1)].map(() => []);
const depth = Array(n + 1).fill(-1);
const parents: number[][] = [...Array(n + 1)].map(() => Array(18).fill(0));
const visited = [...Array(n + 1)];

inp.slice(1, n).forEach((el) => {
  const [from, to] = el.trim().split(" ").map(Number);
  nodes[from].push(to);
  nodes[to].push(from);
});
const ans: number[] = [];

const m = +inp[n];

visited[1] = true;
depth[1] = 0;
dfs(1, 0);

fillParents();

inp
  .slice(n + 1)
  .forEach((el) => ans.push(findLCA(el.trim().split(" ").map(Number))));

console.log(ans.join("\n"));

function dfs(cur: number, d: number) {
  for (const next of nodes[cur]) {
    if (!visited[next]) {
      visited[next] = true;
      depth[next] = d + 1;
      dfs(next, d + 1);
      parents[next][0] = cur;
    }
  }
}
function fillParents() {
  for (let i = 1; i < 18; i++)
    for (let j = 1; j <= n; j++)
      parents[j][i] = parents[parents[j][i - 1]][i - 1];
}
function findLCA([a, b]: number[]) {
  let aN = depth[a];
  let bN = depth[b];
  if (aN < bN) [a, b] = [b, a];
  for (let i = 17; i >= 0; i--)
    if (2 ** i <= depth[a] - depth[b]) a = parents[a][i];
  if (a === b) return a;
  for (let i = 17; i >= 0; i--) {
    if (parents[a][i] !== parents[b][i]) {
      a = parents[a][i];
      b = parents[b][i];
    }
  }
  return parents[a][0];
}
