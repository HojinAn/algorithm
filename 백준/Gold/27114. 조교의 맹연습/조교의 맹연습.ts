import * as fs from 'fs';
const [l, r, b, k] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const INF = Number.MAX_SAFE_INTEGER;
const cache = [...Array(k + 1)].map(() => Array(4).fill(INF));

cache[0][0] = 0;
r < k && (cache[r][1] = 1);
b < k && (cache[b][2] = 1);
l < k && (cache[l][3] = 1);

for (let i = 1; i <= k; i++) {
  cache[i][0] = Math.min(
    i - r >= 0 ? cache[i - r][3] + 1 : INF,
    i - b >= 0 ? cache[i - b][2] + 1 : INF,
    i - l >= 0 ? cache[i - l][1] + 1 : INF,
    cache[i][0]
  );
  cache[i][1] = Math.min(
    i - r >= 0 ? cache[i - r][0] + 1 : INF,
    i - b >= 0 ? cache[i - b][3] + 1 : INF,
    i - l >= 0 ? cache[i - l][2] + 1 : INF,
    cache[i][1]
  );
  cache[i][2] = Math.min(
    i - r >= 0 ? cache[i - r][1] + 1 : INF,
    i - b >= 0 ? cache[i - b][0] + 1 : INF,
    i - l >= 0 ? cache[i - l][3] + 1 : INF,
    cache[i][2]
  );
  cache[i][3] = Math.min(
    i - r >= 0 ? cache[i - r][2] + 1 : INF,
    i - b >= 0 ? cache[i - b][1] + 1 : INF,
    i - l >= 0 ? cache[i - l][0] + 1 : INF,
    cache[i][3]
  );
}

console.log(cache[k][0] === INF ? -1 : cache[k][0]);
