import * as fs from "fs";
const [[n, m], ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const nodes = [...Array(n + 1)].map(() => new Set<number>());
const answer: number[][] = [];
const INF = Number.MAX_VALUE;

inp.forEach(([u, v]) => (nodes[u].add(v), nodes[v].add(u)));

const dijkstra = (start: number) => {
  const visited = Array(n + 1).fill(INF);
  const q = [start];
  visited[start] = 0;
  let qSize = 1,
    qIdx = 0;
  while (qIdx < qSize) {
    const cur = q[qIdx++];
    Array.from(nodes[cur]).forEach(
      (next) =>
        visited[next] == INF &&
        ((visited[next] = visited[cur] + 1), (q[qSize++] = next))
    );
  }
  answer.push([start, visited.slice(1).reduce((acc, cur) => acc + cur)]);
};

for (let i = 1; i <= n; i++) dijkstra(i);

answer.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));

console.log(answer[0][0]);
