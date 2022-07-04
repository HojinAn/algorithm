import * as fs from "fs";
const [input1, ...input2] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [v, e] = input1.trim().split(" ").map(Number),
  parent = [...Array(v + 1)].map((_, i) => i),
  edges: number[][] = [];
let answer = 0,
  v1: number,
  v2: number,
  w: number;

input2.map((el) => {
  [v1, v2, w] = el.trim().split(" ").map(Number);
  edges.push([v1, v2, w]);
});
edges.sort((a, b) => a[2] - b[2]);

const findRoot = (no: number) => {
    if (parent[no] === no) return no;
    return (parent[no] = findRoot(parent[no]));
  },
  union = (a: number, b: number) => {
    const aRoot = findRoot(a),
      bRoot = findRoot(b);
    if (aRoot === bRoot) return false;
    (aRoot < bRoot && (parent[bRoot] = aRoot)) || (parent[aRoot] = bRoot);
    return true;
  };

edges.forEach((el) => {
  [v1, v2, w] = el;
  union(v1, v2) && (answer += w);
});

console.log(answer);
