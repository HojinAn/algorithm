import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [str1, str2, str3] = inputList;
const n = +str1;
const roadLens = str2.trim().split(" ").map(BigInt); // n - 1
const prices = str3.trim().split(" ").map(BigInt); // n
let costs = BigInt(0);
let curMinPrice = prices[0];
for (let i = 0; i < n - 1; i++) {
  if (prices[i] < curMinPrice) curMinPrice = prices[i];
  costs += roadLens[i] * curMinPrice;
}
console.log(String(costs));
