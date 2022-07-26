import * as fs from "fs";
const [[n, m], ...map] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.trim().split(" ").map(Number)),
  delta = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
  ],
  rangeCheck = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m,
  bfs = (r: number, c: number) => {
    const q = [[r, c, 0]],
      visited: boolean[][] = [...Array(n)].map(() => Array(m).fill(false));
    let qSize = 1,
      qIdx = 0,
      ret = 0;
    while (qIdx < qSize) {
      const [curR, curC, cnt] = q[qIdx++];
      for (let i = 0; i < 8; i++) {
        const [nR, nC] = [curR + delta[i][0], curC + delta[i][1]];
        if (rangeCheck(nR, nC) && !visited[nR][nC]) {
          if (map[nR][nC]) return cnt + 1;
          visited[nR][nC] = true;
          q[qSize++] = [nR, nC, cnt + 1];
        }
      }
      ret = cnt + 1;
    }
    return ret;
  };
let ans = 0;
map.forEach((li, r) =>
  li.forEach((el, c) => !el && (ans = Math.max(ans, bfs(r, c))))
);
console.log(ans);
