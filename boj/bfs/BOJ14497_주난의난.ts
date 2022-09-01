import * as fs from "fs";
const [nm, rc, ...lines] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
type Sqaure = [number, number, boolean];
const [n, m] = nm.split(" ").map(Number),
  [r1, c1, r2, c2] = rc.split(" ").map((el) => +el - 1),
  map = lines.map((el) => el.trim().split("")),
  dir = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
const isInRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m;
const bfs = () => {
  const visited = [...Array(n)].map(() => Array(m).fill(false));
  visited[r1][c1] = true;
  const q: Sqaure[] = [[r1, c1, false]];
  let qSize = 1,
    qIdx = 0,
    reached = false;
  while (qIdx < qSize) {
    const [cr, cc, didCrush] = q[qIdx++]!;
    if (cr === r2 && cc === c2) {
      reached = true;
      break;
    }
    didCrush ||
      dir.forEach(([dr, dc]) => {
        const [nr, nc] = [cr + dr, cc + dc];
        if (isInRange(nr, nc) && !visited[nr][nc]) {
          visited[nr][nc] = true;
          let crushig = false;
          map[nr][nc] === "1" && ((map[nr][nc] = "0"), (crushig = true));
          q[qSize++] = [nr, nc, crushig];
        }
      });
  }
  return reached;
};
let answer = 1;
while (!bfs()) answer++;
console.log(answer);
