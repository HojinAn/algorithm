import * as fs from "fs";
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [n, k] = input[0].trim().split(" ").map(Number);
const MAX_VALUE = 100001;
const visited: boolean[] = Array(MAX_VALUE).fill(false);
const costs: number[] = Array(MAX_VALUE).fill(MAX_VALUE);
const pq: number[][] = [];

costs[n] = 0;
pq.push([n, costs[n]]);
let qSize = 1,
  pointer = 0;
let curNo, curCost, nextNo, newCost, size;
while (pointer < qSize) {
  [curNo, curCost] = pq[pointer++];
  if (curNo === k) break;
  if (visited[curNo]) continue;
  visited[curNo] = true;
  nextNo = curNo << 1;
  while (!visited[nextNo] && nextNo <= MAX_VALUE) {
    costs[nextNo] = curCost;
    pq.push([nextNo, costs[nextNo]]);
    qSize++;
    nextNo <<= 1;
  }
  newCost = curCost + 1;
  nextNo = curNo + 1;
  if (!visited[nextNo] && costs[nextNo] > newCost) {
    costs[nextNo] = newCost;
    pq.push([nextNo, costs[nextNo]]);
    qSize++;
  }
  nextNo = curNo - 1;
  if (!visited[nextNo] && costs[nextNo] > newCost) {
    costs[nextNo] = newCost;
    pq.push([nextNo, costs[nextNo]]);
    qSize++;
  }
}

console.log(costs[k]);
