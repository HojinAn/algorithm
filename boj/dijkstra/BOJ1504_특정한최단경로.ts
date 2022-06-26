import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const MAX_VALUE = 200000000000;
const [n, e] = input[0].trim().split(" ").map(Number);

const nodes: number[][][] = [...Array(n + 1)].map((x) => []);
let a, b, c;
input.slice(1, e + 1).forEach((el) => {
  [a, b, c] = el.trim().split(" ").map(Number);
  nodes[a].push([b, c]);
  nodes[b].push([a, c]);
});

const [via1, via2] = input[e + 1].trim().split(" ").map(Number);

const pq: number[][] = [];
let curNo, curCost, nextNo, nextCost, newCost;
const dijkstra = (start: number) => {
  const costs = Array(n + 1).fill(MAX_VALUE);
  costs[start] = 0;
  pq.push([start, 0]);
  while (pq.length) {
    [curNo, curCost] = pq.pop()!;
    nodes[curNo].forEach((el) => {
      [nextNo, nextCost] = el;
      newCost = curCost + nextCost;
      if (costs[nextNo] > newCost) {
        costs[nextNo] = newCost;
        pq.push([nextNo, newCost]);
      }
    });
  }
  return costs;
};

let start = 1,
  via;

const costStart = dijkstra(start);
const costVia1 = dijkstra(via1);
const costVia2 = dijkstra(via2);
const answer = Math.min(
  costStart[via1] + costVia1[via2] + costVia2[n],
  costStart[via2] + costVia2[via1] + costVia1[n]
);

console.log(answer >= MAX_VALUE ? -1 : answer);
