import * as fs from "fs";
const [[n], ...links] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

const nodes: number[][] = [...Array(n + 1)].map(() => []);
links.forEach(([u, v]) => (nodes[u].push(v), nodes[v].push(u)));

const visited = Array(n + 1).fill(false);
const dp = [...Array(n + 1)].map(() => [0, 1]);

const dfs = (no: number) => {
  nodes[no].forEach((next) => {
    if (!visited[next])
      (visited[next] = true),
        dfs(next),
        (dp[no] = [
          dp[no][0] + dp[next][1],
          dp[no][1] + Math.min.apply(null, dp[next]),
        ]);
  });
};

const findRoot = () => {
  const arr = nodes.map((el) => el.length);
  const max = Math.max.apply(null, arr);
  return arr.indexOf(max);
};
const root = findRoot();

visited[root] = true;
dfs(root);

console.log(Math.min.apply(null, dp[root]));
