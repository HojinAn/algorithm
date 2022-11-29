import * as fs from "fs";
const [str1, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
console.log(
  [...Array(+str1)]
    .reduce(
      ({ answer, idx }) => {
        const n = +input[idx++];
        answer.push(
          Array.from<string>(
            Object.values(
              input
                .slice(idx, (idx += n))
                .map((li) => li.trim().split(" "))
                .reduce((dict, [el, key]) => {
                  (dict[key] = dict[key] ?? []).push(el);
                  return dict;
                }, {})
            )
          ).reduce((ans, val) => (ans *= val.length + 1), 1) - 1
        );
        return { answer, idx };
      },
      {
        idx: 0,
        answer: <number[]>[],
      }
    )
    .answer.join("\n")
);
