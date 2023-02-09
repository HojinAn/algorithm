import * as fs from 'fs';

const INF = 1000000000;

const toNums = (str: string) => str.trim().split(' ').map(Number);

const [s1, , ...inp] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const n = Number(s1);
const cities = [...Array(n + 1)].map(() => Array(n + 1).fill(INF));
const paths = [...Array(n + 1)].map(() =>
  [...Array(n + 1)].map(() => <number[]>[])
);
cities.forEach((_, i) => (cities[i][i] = 0));

inp.forEach((li) => {
  const [from, to, cost] = toNums(li);
  if (cities[from][to] > cost) {
    cities[from][to] = cost;
    paths[from][to] = [from, to];
  }
});

for (let via = 1; via <= n; via++) {
  for (let from = 1; from <= n; from++) {
    for (let to = 1; to <= n; to++) {
      if (cities[from][to] > cities[from][via] + cities[via][to]) {
        cities[from][to] = cities[from][via] + cities[via][to];
        paths[from][to] = [...paths[from][via], ...paths[via][to].slice(1)];
      }
    }
  }
}

console.log(
  cities
    .slice(1)
    .map((city) =>
      city
        .slice(1)
        .map((val) => (val === INF ? 0 : val))
        .join(' ')
    )
    .join('\n')
);
console.log(
  paths
    .slice(1)
    .map((path) =>
      path
        .slice(1)
        .map((li) => [li.length, ...li].join(' '))
        .join('\n')
    )
    .join('\n')
);
