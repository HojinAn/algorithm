import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
inp.pop();

const calcBigintMax = (...args: bigint[]) =>
  args.reduce((max, el) => (max > el ? max : el));
const calcBigintMin = (...args: bigint[]) =>
  args.reduce((min, el) => (min < el ? min : el));

const solve = (n: number, boxes: bigint[]) => {
  const calcMidArea = (
    l: number,
    r: number,
    mid = Math.floor((l + r) / 2),
    toLeft = mid,
    toRight = mid,
    height = boxes[mid],
    maxArea = height
  ) => {
    while (l < toLeft && toRight < r) {
      boxes[toLeft - 1] < boxes[toRight + 1]
        ? (toRight++, (height = calcBigintMin(height, boxes[toRight])))
        : (toLeft--, (height = calcBigintMin(height, boxes[toLeft])));
      maxArea = calcBigintMax(maxArea, height * BigInt(toRight - toLeft + 1));
    }

    while (l < toLeft) {
      toLeft--;
      height = calcBigintMin(height, boxes[toLeft]);
      maxArea = calcBigintMax(maxArea, height * BigInt(toRight - toLeft + 1));
    }

    while (toRight < r) {
      toRight++;
      height = calcBigintMin(height, boxes[toRight]);
      maxArea = calcBigintMax(maxArea, height * BigInt(toRight - toLeft + 1));
    }

    return maxArea;
  };

  const calcMaxarea = (l: number, r: number, mid = Math.floor((l + r) / 2)) => {
    if (l === r) return boxes[l];
    const leftArea = calcMaxarea(l, mid);
    const rightArea = calcMaxarea(mid + 1, r);
    const midArea = calcMidArea(l, r);
    return calcBigintMax(leftArea, rightArea, midArea);
  };

  return `${calcMaxarea(0, n - 1)}`;
};

console.log(
  inp
    .reduce((ans, li) => {
      const [n, ...boxes] = li.trim().split(" ").map(BigInt);
      ans.push(solve(Number(n), boxes));
      return ans;
    }, <string[]>[])
    .join("\n")
);
