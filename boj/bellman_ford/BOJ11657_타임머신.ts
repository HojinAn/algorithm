import * as fs from 'fs';
const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const [n] = toNums(S);
const INF = BigInt(10000000);
const START = 1;

const dist: bigint[] = Array(n + 1).fill(INF);
const edges = [...Array(n + 1)].map<[number, bigint][]>(() => []);
dist[START] = BigInt(0);
let negCycle = false;

inp.forEach((li) => {
  const [s, e, t] = toNums(li);
  edges[s].push([e, BigInt(t)]);
});

bellmanFord();

if (negCycle) console.log(-1);
else {
  console.log(
    dist
      .slice(2)
      .reduce(
        (ans, no) => (ans.push(no === INF ? BigInt(-1) : no), ans),
        <bigint[]>[]
      )
      .join('\n')
  );
}

function toNums(str: string) {
  return str.trim().split(' ').map(Number);
}

function bellmanFord() {
  dist[START] = BigInt(0);
  for (let i = 0; i < n; i++) {
    for (let no = 1; no <= n; no++) {
      for (const [to, time] of edges[no]) {
        if (dist[no] !== INF && dist[to] > dist[no] + time) {
          dist[to] = dist[no] + time;
          if (i === n - 1) negCycle = true;
        }
      }
    }
  }
}
