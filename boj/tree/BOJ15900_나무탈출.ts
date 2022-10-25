import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +inp[0];
const ROOT = 1;
const nodes = [...Array(n + 1)].map(() => <number[]>[]);
const visited = Array(n + 1).fill(false);
let ans = 0;

for (let i = 1; i < n; i++) {
  const [u, v] = inp[i].trim().split(" ").map(Number);
  nodes[u].push(v), nodes[v].push(u);
}

const makeTree = (no: number, cnt: number) => {
  if (no !== ROOT && nodes[no].length === 1) {
    ans += cnt;
    return;
  }
  for (const val of nodes[no]) {
    if (visited[val]) continue;
    visited[val] = true;
    makeTree(val, cnt + 1);
  }
};

visited[ROOT] = true;
makeTree(ROOT, 0);

console.log(ans % 2 ? "Yes" : "No");
