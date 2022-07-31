import * as fs from "fs";
const [str1, ...str2] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  [n, m] = str1.trim().split(" ").map(Number),
  map = str2.map((li) => li.trim().split(""));
let answer = 0;
const delta = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  rangeCheck = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m,
  bfs = (r: number, c: number) => {
    const visited = [...Array(n)].map(() => [...Array(m)]),
      q = [[r, c, 0]];
    visited[r][c] = true;
    let qSize = 1,
      qIdx = 0;
    while (qIdx < qSize) {
      const [cR, cC, cnt] = q[qIdx++];
      answer = Math.max(answer, cnt);
      delta.forEach((el) => {
        const [nR, nC] = [cR + el[0], cC + el[1]];
        if (rangeCheck(nR, nC) && map[nR][nC] === "L" && !visited[nR][nC]) {
          visited[nR][nC] = true;
          q[qSize++] = [nR, nC, cnt + 1];
        }
      });
    }
  };
map.forEach((li, r) => li.forEach((el, c) => el === "L" && bfs(r, c)));
console.log(answer);
