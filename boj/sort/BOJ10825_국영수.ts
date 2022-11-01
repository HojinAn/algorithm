import * as fs from "fs";
const [li1, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const strComparator = (s1: string, s2: string) =>
  s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
console.log(
  inp
    .map<[string, ...number[]]>((li) => {
      const info = li.trim().split(" ");
      return [info[0], ...info.slice(1).map(Number)];
    })
    .sort(([nameA, lanA, engA, mathA], [nameB, lanB, engB, mathB]) =>
      lanA === lanB
        ? engA === engB
          ? mathA === mathB
            ? strComparator(nameA, nameB)
            : mathB - mathA
          : engA - engB
        : lanB - lanA
    )
    .map(([name]) => name)
    .join("\n")
);
