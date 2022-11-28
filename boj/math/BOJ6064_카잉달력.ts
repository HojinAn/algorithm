import * as fs from "fs";
const [, ...input] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const convertToArr = (str: string) => str.trim().split(" ").map(Number);

const gcd = (n: number, m: number) => (m === 0 ? n : gcd(m, n % m));

console.log(
  input
    .reduce((answer, li) => {
      const [M, N, x, y] = convertToArr(li);
      for (
        let year = 0, limit = (M * N) / gcd(M, N);
        year * M < limit;
        year++
      ) {
        if ((year * M + x - y) % N === 0) {
          answer.push(year * M + x);
          return answer;
        }
      }
      answer.push(-1);
      return answer;
    }, <number[]>[])
    .join("\n")
);
