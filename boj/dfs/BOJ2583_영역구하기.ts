import * as fs from "fs";
const [str1, ...str2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [m, n, k] = str1.trim().split(" ").map(Number);
const map = [...Array(m)].map(() => Array(n).fill(1));
let visited;
const delta = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
let nX: number, nY: number, x1: number, x2: number, y1: number, y2: number;

const rangeCheck = (nY: number, nX: number) => {
  return y1 <= nY && nY < y2 && x1 <= nX && nX < x2;
};

const dfs = (y: number, x: number) => {
  delta.forEach((el) => {
    nY = y + el[0];
    nX = x + el[1];
    if (rangeCheck(nY, nX) && !visited[nY][nX]) {
      map[nY][nX] = 0;
      visited[nY][nX] = true;
      dfs(nY, nX);
    }
  });
};
const bfs = (y: number, x: number) => {
  const q: number[][] = [];
  let qSize = 0,
    qIdx = 0,
    curY: number,
    curX: number;
  q[qSize++] = [y, x];
  map[y][x] = 0;
  while (q.length && qIdx < qSize) {
    [curY, curX] = q[qIdx++];
    delta.forEach((el) => {
      nY = curY + el[0];
      nX = curX + el[1];
      if (rangeCheck(nY, nX) && map[nY][nX]) {
        map[nY][nX] = 0;
        q[qSize++] = [nY, nX];
        ans++;
      }
    });
  }
};

str2.forEach((el) => {
  [x1, y1, x2, y2] = el.trim().split(" ").map(Number);
  [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
  [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];
  visited = [...Array(m)].map(() => Array(n).fill(false));
  x1 < x2 && y1 < y2 && (map[y1][x1] = 0);
  dfs(y1, x1);
});
const arr: number[] = [];
let ans: number;
[x1, y1, x2, y2] = [0, 0, n, m];
map.forEach((row, y) =>
  row.forEach((el, x) => {
    if (el) {
      map[y][x] = 0;
      ans = 1;
      bfs(y, x);
      arr.push(ans);
    }
  })
);
arr.sort((a, b) => a - b);
let answer = `${arr.length}\n`;
arr.forEach((el) => (answer += `${el} `));
console.log(answer.trim());
