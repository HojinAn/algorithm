import * as fs from 'fs';

const INF = 100000000;
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const n = Number(S);

const costs = inp.map((li) => li.trim().split(' ').map(Number));

const cache = [...Array(n)].map(() => Array(1 << n).fill(INF));

for (let j = 0; j < n; j++) cache[0][1 << j] = costs[0][j];

for (let i = 1; i < n; i++) {
  for (let j = 0; j < 1 << n; j++) {
    for (let k = 0; k < n; k++) {
      if (!(j & (1 << k))) {
        cache[i][j | (1 << k)] = Math.min(
          costs[i][k] + cache[i - 1][j],
          cache[i][j | (1 << k)]
        );
      }
    }
  }
}

console.log(
  cache[n - 1].reduce((max, no) => (no === INF ? max : Math.max(max, no)), 0)
);
