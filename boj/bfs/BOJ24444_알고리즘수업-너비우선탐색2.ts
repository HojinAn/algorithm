import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m, r] = input[0].trim().split(" ").map(Number),
  edges: number[][] = [...Array(n + 1)].map(() => []),
  visited: number[] = Array(n + 1).fill(0);
let u: number,
  v: number,
  order = 1,
  answer = "";

input.slice(1).map((el) => {
  [u, v] = el.trim().split(" ").map(Number);
  edges[u].push(v);
  edges[v].push(u);
});
for (let i = 1; i <= n; i++) edges[i].sort((a, b) => b - a);

(() => {
  const q: number[] = [];
  let qIdx = 0,
    qSize = 0,
    cur: number;
  q[qSize++] = r;
  visited[r] = order++;
  while (qIdx < qSize) {
    cur = q[qIdx++];
    edges[cur].forEach((next) => {
      if (!visited[next]) {
        q[qSize++] = next;
        visited[next] = order++;
      }
    });
  }
})();

visited.slice(1).forEach((el) => (answer += `${el}\n`));

console.log(answer.trim());
