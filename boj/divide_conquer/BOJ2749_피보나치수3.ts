import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const DIV = BigInt(1000000),
  pisano = BigInt(1500000);
let n = BigInt(inputList[0]);

const dp: bigint[] = [...Array(pisano)];
dp[0] = BigInt(0);
dp[1] = BigInt(1);
for (let i = 2; i < pisano && i <= n; i++)
  dp[i] = (dp[i - 1] + dp[i - 2]) % DIV;
n >= pisano && (n %= pisano);
console.log(Number(dp[Number(n)]));
