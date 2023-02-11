import * as fs from 'fs';
const [n, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

let idx = 0;
const visited = Array(n + 1).fill(false);
outer: while (1) {
  for (let i = 2; i <= n; i++) {
    if (visited[i]) continue;
    for (let j = i; j <= n; j += i) {
      if (visited[j]) continue;
      visited[j] = true;
      if (++idx === k) {
        console.log(j);
        break outer;
      }
    }
  }
}
