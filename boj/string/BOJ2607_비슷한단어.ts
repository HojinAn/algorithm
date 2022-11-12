import * as fs from "fs";
const [n, target, ...strings] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const countStr = (str: string) =>
  str
    .trim()
    .split("")
    .reduce((counter, el) => {
      counter[el.charCodeAt(0) - "A".charCodeAt(0)]++;
      return counter;
    }, Array(26).fill(0));
const targetCounter = countStr(target);
const m = target.length;

const compareSimilarity = (str: string, fromCount: number[]) => {
  let cnt = 0;
  const l = str.length;
  for (let i = 0; i < l; i++) {
    const idx = str[i].charCodeAt(0) - "A".charCodeAt(0);
    fromCount[idx] && (cnt++, fromCount[idx]--);
  }
  if (m - 1 === l && cnt === l) return 1;
  if (m === l && (cnt === l || cnt === l - 1)) return 1;
  if (m + 1 === l && cnt === m) return 1;
  return 0;
};

console.log(
  strings.reduce(
    (cnt, str) =>
      (cnt +=
        Math.abs(m - str.length) > 1
          ? 0
          : compareSimilarity(str, [...targetCounter])),
    0
  )
);
