import * as fs from "fs";
const [, ...files] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const counter = new Map<string, number>();
files.forEach((el) => {
  const [, ext] = el.trim().split(".");
  counter.set(ext, (counter.get(ext) ?? 0) + 1);
});
console.log(
  Array.from(counter)
    .sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0))
    .map((el) => el.join(" "))
    .join("\n")
);
