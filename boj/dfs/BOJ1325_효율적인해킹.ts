import * as fs from "fs";
const [str1, ...trust] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, m] = str1.trim().split(" ").map(Number);
const nodes: number[][] = [...Array(n + 1)].map(() => []);

trust.forEach((el) => {
  const [to, from] = el.trim().split(" ").map(Number);
  nodes[from].push(to);
});

const visited = Array(n + 1).fill(false);
const stack: number[] = [];
let max = 0;
let ans: number[] = [];

for (let i = 1; i <= n; i++) {
  visited.fill(false);
  visited[i] = true;
  stack.push(i);
  let cnt = 0;
  let no;
  while (true) {
    no = stack.pop();
    if (!no) break;
    nodes[no].forEach(
      (to) => !visited[to] && ((visited[to] = true), stack.push(to), cnt++)
    );
  }
  cnt++;
  if (max < cnt) {
    ans = [i];
    max = cnt;
  } else if (max === cnt) ans.push(i);
}

console.log(ans.join(" "));
