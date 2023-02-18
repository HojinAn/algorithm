import * as fs from 'fs';

type Point = [number, number] | number[];
type Edge = [number, number, number];

const toNums = (str: string): Point => str.trim().split(' ').map(Number);

const calcLength = ([ra, ca]: Point, [rb, cb]: Point) =>
  ((ra - rb) ** 2 + (ca - cb) ** 2) ** 0.5;

const makeEdges = (coords: Point[], n: number, edges = <Edge[]>[]) => {
  for (let i = 1; i < n; i++)
    for (let j = i + 1; j <= n; j++)
      edges.push([i, j, calcLength(coords[i], coords[j])]);
  return edges;
};

const makeParents = (n: number) => Array(n + 1).fill(-1);

const find = (parents: number[]) => {
  const findRoot = (a: number): number => {
    if (parents[a] === -1) return a;
    return (parents[a] = findRoot(parents[a]));
  };
  return findRoot;
};

const union = (parents: number[]) => {
  const findRoot = find(parents);
  const unionPair = ([a, b]: number[]) => {
    const aRoot = findRoot(a);
    const bRoot = findRoot(b);
    if (aRoot === bRoot) return false;
    aRoot < bRoot ? (parents[bRoot] = aRoot) : (parents[aRoot] = bRoot);
    return true;
  };
  return unionPair;
};

const [S, ...inp] = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
const [n] = S.trim().split(' ').map(Number);
const coords: Point[] = [[0, 0], ...inp.slice(0, n).map<Point>(toNums)];
const edges = makeEdges(coords, n).sort((a, b) => a[2] - b[2]);
const parents = makeParents(n);

const unionPair = union(parents);
inp.slice(n).forEach((li) => unionPair(toNums(li)));
console.log(
  edges
    .reduce((ans, [a, b, sqr]) => ans + (unionPair([a, b]) ? sqr : 0), 0)
    .toFixed(2)
);
