import * as fs from "fs";
const [[n, m], ...infos] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const visited = [...Array(n)].map(() => Array(m).fill(false));

let cnt = 0,
  max = 0,
  cntInfo = 0;
const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
infos.forEach((li, r) =>
  li.forEach((el, c) => {
    if (el && !visited[r][c]) {
      const stack = [[r, c]];
      visited[r][c] = true;
      cntInfo = 1;
      while (stack.length) {
        const [cr, cc] = stack.pop()!;
        dir.forEach(([dr, dc]) => {
          const [nr, nc] = [cr + dr, cc + dc];
          if (
            0 <= nr &&
            nr < n &&
            0 <= nc &&
            nc < m &&
            !visited[nr][nc] &&
            infos[nr][nc] === 1
          ) {
            visited[nr][nc] = true;
            stack.push([nr, nc]);
            cntInfo++;
          }
        });
      }
      max = Math.max(max, cntInfo);
      cnt++;
    }
  })
);
console.log(`${cnt}\n${max}`);
