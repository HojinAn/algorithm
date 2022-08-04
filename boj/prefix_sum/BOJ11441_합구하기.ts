import * as fs from "fs";
const [[n], tmp, [m], ...sections] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((el) => el.trim().split(" ").map(Number)),
  arr = [0, ...tmp],
  tree: number[] = [];
let answer = "";

const makeTree = (no: number, l: number, r: number) => {
  if (l === r) return (tree[no] = arr[l]);
  const mid = Math.floor((l + r) / 2);
  return (tree[no] =
    makeTree(2 * no, l, mid) + makeTree(2 * no + 1, mid + 1, r));
};
const printSum = (no: number, l: number, r: number, [from, to]: number[]) => {
  if (from > r || to < l) return 0;
  if (from <= l && r <= to) return tree[no];
  const mid = Math.floor((l + r) / 2);
  return (
    printSum(2 * no, l, mid, [from, to]) +
    printSum(2 * no + 1, mid + 1, r, [from, to])
  );
};

makeTree(1, 1, n);
sections.forEach((el) => (answer += `${printSum(1, 1, n, el)}\n`));
console.log(answer.trim());
