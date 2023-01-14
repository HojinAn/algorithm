import * as fs from "fs";
const [S, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [n] = S.trim().split(" ").map(Number);

const MAX = Number.MAX_VALUE;
const MIN = Number.MIN_VALUE;
const minSegTree = Array(4 * (n + 1)).fill(MAX);
const maxSegTree = Array(4 * (n + 1)).fill(MIN);

const nums = [0, ...inp.slice(0, n).map(Number)];

const calcMid = (start: number, end: number) => Math.floor((start + end) / 2);

const makeMaxSegTree = (
  no: number,
  start: number,
  end: number,
  mid = calcMid(start, end)
) => {
  if (start === end) return (maxSegTree[no] = nums[start]);
  return (maxSegTree[no] = Math.max(
    makeMaxSegTree(2 * no, start, mid),
    makeMaxSegTree(2 * no + 1, mid + 1, end)
  ));
};
const makeMinSegTree = (
  no: number,
  start: number,
  end: number,
  mid = calcMid(start, end)
) => {
  if (start === end) return (minSegTree[no] = nums[start]);
  return (minSegTree[no] = Math.min(
    makeMinSegTree(2 * no, start, mid),
    makeMinSegTree(2 * no + 1, mid + 1, end)
  ));
};

const findMaxBetween = ([from, to]: number[]) => {
  const findMaxSegTree = (
    idx: number,
    start: number,
    end: number,
    mid = calcMid(start, end)
  ) => {
    if (to < start || end < from) return MIN;
    if (from <= start && end <= to) return maxSegTree[idx];
    return Math.max(
      findMaxSegTree(2 * idx, start, mid),
      findMaxSegTree(2 * idx + 1, mid + 1, end)
    );
  };
  return findMaxSegTree(1, 1, n);
};
const findMinBetween = ([from, to]: number[]) => {
  const findMinSegTree = (
    idx: number,
    start: number,
    end: number,
    mid = calcMid(start, end)
  ) => {
    if (to < start || end < from) return MAX;
    if (from <= start && end <= to) return minSegTree[idx];
    return Math.min(
      findMinSegTree(2 * idx, start, mid),
      findMinSegTree(2 * idx + 1, mid + 1, end)
    );
  };
  return findMinSegTree(1, 1, n);
};

makeMaxSegTree(1, 1, n);
makeMinSegTree(1, 1, n);

console.log(
  inp
    .slice(n)
    .reduce<string[]>((ans, li) => {
      const fromTo = li.trim().split(" ").map(Number);
      ans.push([findMinBetween(fromTo), findMaxBetween(fromTo)].join(" "));
      return ans;
    }, [])
    .join("\n")
);
