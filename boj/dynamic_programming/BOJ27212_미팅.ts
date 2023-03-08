import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, m, c] = toNums(S);
const satisfactions = inp.slice(0, c).map(toNums);
const aUniv = toNums(inp[c]).map((no) => no - 1);
const bUniv = toNums(inp[c + 1]).map((no) => no - 1);

const cache = [...Array(n)].map(() => Array(m).fill(-1));

const dp = (i: number, j: number) => {
  if (i >= n || j >= m) return 0;
  if (cache[i][j] !== -1) return cache[i][j];
  if (i === n - 1 && j === m - 1)
    return (cache[i][j] = satisfactions[aUniv[i]][bUniv[j]]);
  return (cache[i][j] = Math.max(
    satisfactions[aUniv[i]][bUniv[j]] + dp(i + 1, j + 1),
    dp(i, j + 1),
    dp(i + 1, j)
  ));
};

console.log(dp(0, 0));

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}
