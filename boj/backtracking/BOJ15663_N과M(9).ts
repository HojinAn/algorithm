import * as fs from "fs";
const [[n, m], arr] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((el) => el.trim().split(" ").map(Number));
arr.sort((a, b) => a - b);
const set = new Set<string>();
const customPermu = (cnt: number, numArr: number[], visited: number) => {
  if (cnt === m) {
    set.add(numArr.join(" "));
    return;
  }
  for (let i = 0; i < n; i++) {
    if (visited & (1 << i)) continue;
    customPermu(cnt + 1, [...numArr, arr[i]], visited | (1 << i));
  }
};
customPermu(0, [], 0);
console.log(Array.from(set).join("\n"));
