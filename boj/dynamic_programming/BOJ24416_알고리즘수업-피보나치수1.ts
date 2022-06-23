import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +inputList[0];
let cnt1 = 0,
  cnt2 = 0;
const fib = (no: number) => {
  if (no === 1 || no === 2) {
    cnt1++;
    return 1;
  }
  return fib(no - 1) + fib(no - 2);
};
const dp = Array(n + 1).fill(0);
const fibDP = (no: number) => {
  if (dp[no]) return dp[no];
  if (no === 1 || no === 2) return (dp[no] = 1);
  cnt2++;
  return (dp[no] = fibDP(no - 1) + fibDP(no - 2));
};

fib(n);
fibDP(n);
console.log(`${cnt1} ${cnt2}`);
