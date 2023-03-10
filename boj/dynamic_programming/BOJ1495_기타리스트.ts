import * as fs from 'fs';
const [S1, S2] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n, s, m] = toNums(S1);
const diffs = toNums(S2);

const cache = [...Array(n + 1)].map(() => Array(m + 1).fill(false));

cache[0][s] = true;
for (let i = 0; i < n; i++) {
  cache[i].forEach((vol, j) => {
    if (vol) {
      0 <= j - diffs[i] && (cache[i + 1][j - diffs[i]] = true);
      j + diffs[i] <= m && (cache[i + 1][j + diffs[i]] = true);
    }
  });
}

let ans = -1;

for (let i = m; i >= 0; i--) {
  if (cache[n][i]) {
    ans = i;
    break;
  }
}

console.log(ans);

function toNums(s: string) {
  return s.trim().split(' ').map(Number);
}
