import * as fs from "fs";
const [S, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const toNums = (str: string) => str.trim().split(" ").map(Number);
const [n] = toNums(S);

let ans = 0;
const visited = Array(n).fill(false);
const nodes = [...Array(n)].map(() => <number[]>[]);
inp.forEach((li) => {
  const [p, q] = toNums(li);
  nodes[p].push(q);
  nodes[q].push(p);
});
nodes.forEach((_, i) => nodes[i].sort((a, b) => a - b));
const dfs = (depth: number, no: number) => {
  if (ans) return;
  if (depth === 5) {
    ans = 1;
    return;
  }
  nodes[no].forEach((next) => {
    if (!visited[next]) {
      visited[next] = true;
      dfs(depth + 1, next);
      visited[next] = false;
    }
  });
};
for (let i = 0; i < n; i++) {
  if (ans) break;
  visited[i] = true;
  dfs(1, i);
  visited[i] = false;
}

console.log(ans);
