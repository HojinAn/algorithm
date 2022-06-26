import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const [str1, ...str2] = inputList;
const [n, m, k] = str1.trim().split(" ").map(Number);
const arr = [BigInt(0), ...str2.slice(0, n).map(BigInt)];
const tree: bigint[] = [...Array(4 * n)];
let answer = "";

const initTree: (start: number, end: number, no: number) => bigint = (
  start,
  end,
  no
) => {
  if (start === end) return (tree[no] = arr[start]);
  const mid = Math.floor((start + end) / 2);
  return (tree[no] =
    initTree(start, mid, no * 2) + initTree(mid + 1, end, no * 2 + 1));
};
const updateNum: (
  start: number,
  end: number,
  no: number,
  idx: number,
  diff: bigint
) => void = (start, end, no, idx, diff) => {
  if (idx < start || idx > end) return;
  tree[no] += diff;
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  updateNum(start, mid, no * 2, idx, diff);
  updateNum(mid + 1, end, no * 2 + 1, idx, diff);
};
const printSum: (
  start: number,
  end: number,
  no: number,
  from: number,
  to: number
) => bigint = (start, end, no, from, to) => {
  if (from > end || to < start) return BigInt(0);
  if (from <= start && end <= to) return tree[no];
  const mid = Math.floor((start + end) / 2);
  return (
    printSum(start, mid, no * 2, from, to) +
    printSum(mid + 1, end, no * 2 + 1, from, to)
  );
};

initTree(1, n, 1);
str2.slice(n, n + m + k).forEach((el) => {
  const line = el.trim().split(" ");
  const [a, b, c] = [+line[0], +line[1], BigInt(line[2])];
  switch (a) {
    case 1:
      const diff = c - arr[b];
      arr[b] = c;
      updateNum(1, n, 1, b, diff);
      break;
    default:
      answer += `${String(printSum(1, n, 1, b, Number(c)))}\n`;
      break;
  }
});

console.log(answer.trim());
