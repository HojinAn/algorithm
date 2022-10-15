import * as fs from "fs";
const [[n, m], ...cheeseMap] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let time = 0;

const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const checkRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m;
const dfs = (
  r: number,
  c: number,
  toMeltMap: number[][],
  visited: boolean[][]
) => {
  dir.forEach(([dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];
    if (checkRange(nr, nc) && !cheeseMap[r][c]) {
      !visited[nr][nc] &&
        ((visited[nr][nc] = true), dfs(nr, nc, toMeltMap, visited));
      toMeltMap[nr][nc]++;
    }
  });
};
const checkHole = () => {
  const toMeltMap = [...Array(n)].map<number[]>(() => Array(m).fill(0));
  const visited = [...Array(n)].map<boolean[]>(() => Array(m).fill(false));
  dfs(0, 0, toMeltMap, visited);
  return toMeltMap;
};
const checkCheese = () => {
  let cnt = 0;
  cheeseMap.forEach((li) => li.forEach((el) => el && cnt++));
  return cnt;
};
const meltCheese = (toMeltMap: number[][]) =>
  toMeltMap.forEach((li, i) =>
    li.forEach((el, j) => el >= 2 && (cheeseMap[i][j] = 0))
  );

while (1) {
  const cnt = checkCheese();
  const toMeltMap = checkHole();
  if (!cnt) break;
  meltCheese(toMeltMap);
  time++;
}
console.log(time);
