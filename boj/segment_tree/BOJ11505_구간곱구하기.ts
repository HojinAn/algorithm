import * as fs from "fs";
const [S, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const toNums = (str: string) => str.trim().split(" ").map(Number);
const calcMid = (a: number, b: number) => Math.floor((a + b) / 2);

const DIV = BigInt(1_000_000_007);
const ONE = BigInt(1);
const [n] = toNums(S);
const numbers = [ONE, ...inp.slice(0, n).map(BigInt)];
const multiSegTree = Array<bigint>(4 * (n + 1)).fill(ONE);

const makeTree = (idx: number, start: number, end: number): bigint => {
  if (start === end) return (multiSegTree[idx] = numbers[start]);
  const mid = calcMid(start, end);
  return (multiSegTree[idx] =
    (makeTree(2 * idx, start, mid) * makeTree(2 * idx + 1, mid + 1, end)) %
    DIV);
};
const updateTreeFromTo = (idx: number, val: bigint) => {
  const updateTree = (no: number, start: number, end: number): bigint => {
    if (idx < start || end < idx) return multiSegTree[no];
    if (start === end) return (multiSegTree[no] = val);
    const mid = calcMid(start, end);
    return (multiSegTree[no] =
      (updateTree(2 * no, start, mid) * updateTree(2 * no + 1, mid + 1, end)) %
      DIV);
  };
  updateTree(1, 1, n);
};
const printMultiBetween = (from: number, to: number) => {
  const printSegTree = (idx: number, start: number, end: number): bigint => {
    if (to < start || end < from) return ONE;
    if (from <= start && end <= to) return multiSegTree[idx];
    const mid = calcMid(start, end);
    return (
      (printSegTree(2 * idx, start, mid) *
        printSegTree(2 * idx + 1, mid + 1, end)) %
      DIV
    );
  };
  return printSegTree(1, 1, n);
};

makeTree(1, 1, n);
console.log(
  inp
    .slice(n)
    .reduce<bigint[]>((ans, li) => {
      const [a, b, c] = toNums(li);
      switch (a) {
        case 1:
          numbers[b] = BigInt(c);
          updateTreeFromTo(b, numbers[b]);
          break;
        case 2:
          ans.push(printMultiBetween(b, c));
          break;
      }
      return ans;
    }, [])
    .join("\n")
);
