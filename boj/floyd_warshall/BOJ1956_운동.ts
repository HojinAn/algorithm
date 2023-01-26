import * as fs from 'fs';

const INF = 4000000000;

const toNums = (str: string) => str.trim().split(' ').map(Number);
const connectTown = (towns: number[][]) => (str: string) => {
  const [from, to, t] = toNums(str);
  towns[from][to] = t;
};

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [v] = toNums(S);

const towns = [...Array(v + 1)].map(() => Array(v + 1).fill(INF));
towns.forEach(
  (_, i) => ((towns[i][i] = 0), (towns[0][i] = 0), (towns[i][0] = 0))
);
inp.forEach(connectTown(towns));

for (let via = 1; via <= v; via++)
  for (let from = 1; from <= v; from++)
    for (let to = 1; to <= v; to++)
      towns[from][to] > towns[from][via] + towns[via][to] &&
        (towns[from][to] = towns[from][via] + towns[via][to]);

let ans = INF;

for (let from = 1; from <= v; from++) {
  for (let to = 1; to <= v; to++) {
    if (from === to) continue;
    ans = Math.min(towns[from][to] + towns[to][from], ans);
  }
}

console.log(ans === INF ? -1 : ans);
