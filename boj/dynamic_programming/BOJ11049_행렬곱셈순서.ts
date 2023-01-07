import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const n = Number(S);
const matrix = inp.map((li) => li.trim().split(' ').map(Number));
const INF = Number.MAX_SAFE_INTEGER;
if (n === 1) console.log(0);
else if (n === 2) console.log(matrix[0][0] * matrix[0][1] * matrix[1][1]);
else {
  const cache = [...Array(n)].map(() => Array(n).fill(INF));
  const getDP = (from: number, to: number) => {
    if (from === to) return (cache[from][to] = 0);
    if (to - from === 1)
      return (cache[from][to] =
        matrix[from][0] * matrix[from][1] * matrix[to][1]);
    if (cache[from][to] !== INF) return cache[from][to];
    for (let i = from; i < to; i++)
      cache[from][to] = Math.min(
        cache[from][to],
        matrix[from][0] * matrix[i][1] * matrix[to][1] +
          getDP(from, i) +
          getDP(i + 1, to)
      );
    return cache[from][to];
  };
  console.log(getDP(0, n - 1));
}
