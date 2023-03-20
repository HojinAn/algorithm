import * as fs from 'fs';

const toNums = (s: string) => s.trim().split(' ').map(Number);

const INF = Number.MAX_SAFE_INTEGER;
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m] = toNums(S);
const trips = inp.map(toNums);

const cache = [...Array(n)].map(() =>
  [...Array(m)].map(() => Array(3).fill(INF))
);

trips[0].forEach((fuel, i) => {
  for (let j = 0; j < 3; j++) cache[0][i][j] = fuel;
});

for (let i = 1; i < n; i++) {
  const prevCache = cache[i - 1];
  for (let j = 0; j < m; j++) {
    const curCache = cache[i][j];
    j > 0 &&
      (curCache[0] =
        Math.min(prevCache[j - 1][1], prevCache[j - 1][2]) + trips[i][j]);
    curCache[1] = Math.min(prevCache[j][0], prevCache[j][2]) + trips[i][j];
    j < m - 1 &&
      (curCache[2] =
        Math.min(prevCache[j + 1][0], prevCache[j + 1][1]) + trips[i][j]);
  }
}

console.log(
  cache[n - 1].reduce(
    (min, el) => (el.forEach((no) => (min = Math.min(min, no))), min),
    INF
  )
);
