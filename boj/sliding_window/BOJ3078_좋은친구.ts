import * as fs from "fs";
const [li1, ...students] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [n, k] = li1.trim().split(" ").map(Number);

const counterMap = students.slice(0, k + 1).reduce((dict, { length }) => {
  dict.set(length, (dict.get(length) ?? 0) + 1);
  return dict;
}, new Map<number, number>());

console.log(
  students.slice(0, n - k - 1).reduce<[Map<number, number>, number]>(
    ([counter, sum], { length: prev }, i) => {
      counter.set(prev, counter.get(prev)! - 1);
      const next = students[i + k + 1].length;
      const nextCnt = counter.get(next);
      nextCnt && (sum += nextCnt);
      counter.set(next, (nextCnt ?? 0) + 1);
      return [counter, sum];
    },
    [
      counterMap,
      Array.from(counterMap.values()).reduce(
        (sum, cnt) => (sum += cnt > 1 ? (cnt * (cnt - 1)) / 2 : 0),
        0
      ),
    ]
  )[1]
);
