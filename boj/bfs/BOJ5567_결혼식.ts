import * as fs from 'fs';
const [str1, , ...pairs] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');

const n = +str1;

const relations = pairs
  .map((pair) => pair.trim().split(' ').map(Number))
  .reduce(
    (rels, [a, b]) => (rels[a].push(b), rels[b].push(a), rels),
    [...Array(n + 1)].map(() => <number[]>[])
  );

const q = [[1, 0]];
const visited = Array(n + 1).fill(false);
visited[1] = true;
let qSize = 1,
  qIdx = 0;
while (qIdx < qSize) {
  const [cur, cnt] = q[qIdx++];
  cnt < 2 &&
    relations[cur].forEach(
      (next) =>
        visited[next] ||
        ((visited[next] = true), (q[qSize++] = [next, cnt + 1]))
    );
}
console.log(qSize - 1);
