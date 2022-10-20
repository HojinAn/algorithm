import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();

const visited = Array(n + 1).fill(false);

const q = [[n]];
let qSize = 1,
  qIdx = 0;

let answer: number[] = [];

while (qIdx < qSize) {
  const polled = q[qIdx++];
  const cur = polled[polled.length - 1];
  if (cur === 1) {
    answer = polled;
    break;
  }
  const next1 = cur / 3;
  const next2 = cur / 2;
  const next3 = cur - 1;
  if (!(cur % 3) && !visited[next1]) {
    visited[next1] = true;
    q[qSize++] = [...polled, next1];
  }
  if (!(cur % 2) && !visited[next2]) {
    visited[next2] = true;
    q[qSize++] = [...polled, next2];
  }
  if (!visited[next3]) {
    visited[next3] = true;
    q[qSize++] = [...polled, next3];
  }
}

console.log(`${answer.length - 1}\n${answer.join(" ")}`);
