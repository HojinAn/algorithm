import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, m] = inputList[0].trim().split(" ").map(Number);
const ladder = Array(101).fill(0);

let u, v;
inputList.slice(1).forEach((el) => {
  [u, v] = el.trim().split(" ").map(Number);
  ladder[u] = v;
});

let answer = Number.MAX_SAFE_INTEGER;
const q: number[][] = [],
  visited = Array(101).fill(0);
(function () {
  let qIdx = 0,
    pointer = 0,
    cur,
    cnt,
    next;
  q[qIdx++] = [1, 0];
  visited[1] = 1;
  while (1) {
    [cur, cnt] = q[pointer++];
    if (cur === 100) {
      answer = Math.min(cnt, answer);
      break;
    }
    for (let i = 1; i <= 6; i++) {
      next = cur + i;
      if (next <= 100 && !visited[next]) {
        visited[next] = 1;
        q[qIdx++] = ladder[next] ? [ladder[next], cnt + 1] : [next, cnt + 1];
      }
    }
  }
})();

console.log(answer);
