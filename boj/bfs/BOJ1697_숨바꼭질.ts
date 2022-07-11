import * as fs from "fs";
const [input] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input.trim().split(" ").map(Number);

const q: number[][] = [];
const visited: boolean[] = [...Array(100001)];
const moveTo: Function[] = [
  (x: number) => x - 1,
  (x: number) => x + 1,
  (x: number) => 2 * x,
];
let qSize = 0,
  qIdx = 0,
  cur: number,
  curT: number,
  next: number,
  nextT: number,
  answer = 0;

const bfs = () => {
  q[qSize++] = [n, 0];
  visited[n] = true;
  if (n === k) return;
  while (qIdx < qSize) {
    [cur, curT] = q[qIdx++];
    nextT = curT + 1;
    for (let i = 0; i < 3; i++) {
      next = moveTo[i](cur);
      if (0 <= next && next <= 100000 && !visited[next]) {
        if (next === k) {
          answer = nextT;
          return;
        }
        q[qSize++] = [next, nextT];
        visited[next] = true;
      }
    }
  }
};
bfs();
console.log(answer);
