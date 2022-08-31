import * as fs from "fs";
const [[n], ...paper] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
const counter = { "-1": 0, "0": 0, "1": 0 };
const divide = (r: number, c: number, size: number) => {
  const childSize = Math.floor(size / 3);
  if (isSame(r, c, size)) counter[paper[r][c]]++;
  else
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        divide(r + childSize * i, c + childSize * j, childSize);
};
const isSame = (r: number, c: number, size: number) => {
  const flag = paper[r][c];
  for (let i = r; i < r + size; i++)
    for (let j = c; j < c + size; j++) if (flag !== paper[i][j]) return false;
  return true;
};
divide(0, 0, n);
console.log(
  Object.entries(counter)
    .sort((a, b) => +a[0] - +b[0])
    .reduce((acc, cur) => `${acc}\n${cur[1]}`, "")
    .trim()
);
