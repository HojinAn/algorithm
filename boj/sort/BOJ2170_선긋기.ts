import * as fs from "fs";
const [[n], ...coords] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((li) => li.trim().split(" ").map(Number));

console.log(
  coords
    .sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]))
    .reduce(
      ({ sum, from, to }, [l, r], i) => {
        l > to && ((sum += to - from), (from = l));
        r > to && (to = r);
        i === n - 1 && (sum += to - from);
        return { sum, from, to };
      },
      { sum: 0, from: coords[0][0], to: coords[0][1] }
    ).sum
);
