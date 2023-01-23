import * as fs from 'fs';
const [s1, s2, s3] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

class App {
  memory: number;
  cost: number;
  constructor(memory, cost) {
    this.memory = memory;
    this.cost = cost;
  }
}

const MAX_COST = 10000;
const [n, m] = toNums(s1);
const memories = toNums(s2);
const costs = toNums(s3);
const apps = [
  new App(0, 0),
  ...[...Array(n)]
    .map((_, i) => new App(memories[i], costs[i]))
    .sort((a, b) =>
      a.cost === b.cost ? b.memory - a.memory : a.cost - b.cost
    ),
];
const dp = [...Array(n + 1)].map(() => Array(MAX_COST + 1).fill(0));

for (let i = 1; i <= n; i++) {
  const { cost, memory } = apps[i];
  for (let j = 0; j <= MAX_COST; j++)
    dp[i][j] =
      j < cost
        ? dp[i - 1][j]
        : Math.max(dp[i - 1][j], dp[i - 1][j - cost] + memory);
}

for (let i = 1; i <= MAX_COST; i++) {
  if (dp[n][i] >= m) {
    console.log(i);
    break;
  }
}

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}
