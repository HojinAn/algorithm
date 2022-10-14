import * as fs from "fs";
const [[n, m], ...map] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let time = 0;
let answer = 0;
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
  toMeltMap: boolean[][],
  visited: boolean[][]
) => {
  if (map[r][c]) {
    toMeltMap[r][c] = true;
    return;
  }
  dir.forEach(([dr, dc]) => {
    const [nr, nc] = [r + dr, c + dc];
    checkRange(nr, nc) &&
      !visited[nr][nc] &&
      ((visited[nr][nc] = true), dfs(nr, nc, toMeltMap, visited));
  });
};
const checkHole = () => {
  const toMeltMap = [...Array(n)].map<boolean[]>(() => Array(m).fill(false));
  const visited = [...toMeltMap];
  dfs(0, 0, toMeltMap, visited);
  return toMeltMap;
};
const checkCheese = () => {
  let cnt = 0;
  map.forEach((li) => li.forEach((el) => el && cnt++));
  return cnt;
};
const meltCheese = (toMeltMap: boolean[][]) =>
  toMeltMap.forEach((li, i) => li.forEach((el, j) => el && (map[i][j] = 0)));

while (1) {
  const cnt = checkCheese();
  const toMeltMap = checkHole();
  if (!cnt) break;
  answer = cnt;
  meltCheese(toMeltMap);
  time++;
}
console.log(`${time}\n${answer}`);
