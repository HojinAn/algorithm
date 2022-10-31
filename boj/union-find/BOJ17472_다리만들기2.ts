import * as fs from "fs";
const [[n, m], ...islandsMap] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));

let no = 1;
const visited = [...Array(n)].map(() => Array(m).fill(false));
const delta = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const nodeBoundary = [].map(() => new Set<string>());

const isInRange = (r: number, c: number) => 0 <= r && r < n && 0 <= c && c < m;
const setIslands = (r: number, c: number, no: number) => {
  visited[r][c] = true;
  islandsMap[r][c] = no;
  const q = [[r, c]];
  let qSize = 1,
    qIdx = 0;
  while (qIdx < qSize) {
    const [cr, cc] = q[qIdx++];
    delta.forEach(([dr, dc]) => {
      const [nr, nc] = [cr + dr, cc + dc];
      if (isInRange(nr, nc) && !visited[nr][nc]) {
        if (islandsMap[nr][nc]) {
          visited[nr][nc] = true;
          islandsMap[nr][nc] = no;
          q[qSize++] = [nr, nc];
        } else {
          (nodeBoundary[no] = nodeBoundary[no] ?? new Set<string>()).add(
            [cr, cc].join(",")
          );
        }
      }
    });
  }
};

islandsMap.forEach((li, r) =>
  li.forEach((el, c) => el && !visited[r][c] && setIslands(r, c, no++))
);

const edges = <number[][]>[];

const makeEdge = (from: number, r: number, c: number) => {
  for (let i = r + 1; i < n; i++) {
    if (islandsMap[i][c]) {
      if (islandsMap[i][c] !== from && i - r - 1 > 1)
        edges.push([from, islandsMap[i][c], i - r - 1]);
      break;
    }
  }
  for (let i = r - 1; i >= 0; i--) {
    if (islandsMap[i][c]) {
      if (islandsMap[i][c] !== from && r - i - 1 > 1)
        edges.push([from, islandsMap[i][c], r - i - 1]);
      break;
    }
  }
  for (let i = c + 1; i < m; i++) {
    if (islandsMap[r][i]) {
      if (islandsMap[r][i] !== from && i - c - 1 > 1)
        edges.push([from, islandsMap[r][i], i - c - 1]);
      break;
    }
  }
  for (let i = c - 1; i >= 0; i--) {
    if (islandsMap[r][i]) {
      if (islandsMap[r][i] !== from && c - i - 1 > 1)
        edges.push([from, islandsMap[r][i], c - i - 1]);
      break;
    }
  }
};

const makeNthEdge = (from: number) => {
  const nodeInfo = Array.from(nodeBoundary[from]).map((el) =>
    el.trim().split(",").map(Number)
  );
  nodeInfo.forEach(([r, c]) => makeEdge(from, r, c));
};

for (let i = 1; i < no; i++) makeNthEdge(i);

const connected = Array(no).fill(false);

const parents = [...Array(no)].map((_, i) => i);
const findRoot = (a: number) => {
  if (parents[a] === a) return a;
  return (parents[a] = findRoot(parents[a]));
};
const union = (a: number, b: number) => {
  const aRoot = findRoot(a);
  const bRoot = findRoot(b);
  if (aRoot === bRoot) return false;
  if (aRoot > bRoot) parents[aRoot] = bRoot;
  else parents[bRoot] = aRoot;
  connected[a] = true;
  connected[b] = true;
  return true;
};

const answer = edges
  .sort(([aF, aT, aL], [bF, bT, bL]) =>
    aL === bL ? (aF === bF ? aT - bT : aF - bF) : aL - bL
  )
  .reduce(
    (answer, [from, to, len]) => (union(from, to) ? answer + len : answer),
    0
  );
const allConnected = connected.slice(1).reduce(
  (all, el) => all && el,
  (() => {
    let sameParents = true;
    for (let i = 1; i < no; i++) {
      for (let j = i + 1; j < no; j++) {
        if (findRoot(i) !== findRoot(j)) sameParents = false;
      }
    }
    return sameParents;
  })()
);

console.log(allConnected ? answer : -1);
