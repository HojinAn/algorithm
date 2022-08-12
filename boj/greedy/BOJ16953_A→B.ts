import * as fs from "fs";
const [a, b] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(BigInt);
const visited: { [key: string]: boolean } = {};
const q: [string, number][] = [["" + a, 1]];
visited[q[0][0]] = true;
let qSize = 1,
  qIdx = 0,
  answer = -1;
while (qIdx < qSize) {
  const [cur, cnt] = q[qIdx++];
  let next = 2 * +cur + "";
  if (BigInt(next) <= b && !visited[next]) {
    if (BigInt(next) === b) {
      answer = cnt + 1;
      break;
    }
    visited[next] = true;
    q[qSize++] = [next, cnt + 1];
  }
  next = cur + "1";
  if (BigInt(next) <= b && !visited[next]) {
    if (BigInt(next) === b) {
      answer = cnt + 1;
      break;
    }
    visited[next] = true;
    q[qSize++] = [next, cnt + 1];
  }
}
console.log(answer);
