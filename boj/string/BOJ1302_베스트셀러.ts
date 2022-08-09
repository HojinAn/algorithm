import * as fs from "fs";
const [n, ...books] = fs
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n"),
  map = new Map();
books.forEach((el) => {
  const val = map.get(el);
  val ? map.set(el, val + 1) : map.set(el, 1);
});
console.log(
  Array.from(map.entries())
  .sort((a, b) => (b[1] === a[1] ? (a[0] < b[0] ? -1 : 1) : b[1] - a[1]))[0][0]
);
