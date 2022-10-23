import * as fs from "fs";
const [T, ...inp] = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const answer = <number[]>[];

const calcIdx = (no: number, idx = Math.ceil(no / 2)) => (no % 2 ? -idx : idx);

const minDifficult = (
  logCnt: number,
  heights: number[],
  mid = Math.floor(logCnt / 2)
) =>
  heights
    .reduce(
      (arr, el, i) => ((arr[mid + calcIdx(i)] = el), arr),
      Array(logCnt).fill(0)
    )
    .reduce(
      (max, el, i, arr) => Math.max(max, Math.abs(el - arr[(i + 1) % logCnt])),
      0
    );

for (let i = 0; i < +T * 2; i++) {
  const logCnt = +inp[i++];
  const heights = inp[i]
    .trim()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  answer.push(minDifficult(logCnt, heights));
}

console.log(answer.join("\n"));
