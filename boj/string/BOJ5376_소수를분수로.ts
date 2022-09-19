import * as fs from "fs";
const [str1, ...inp] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const TC = +str1;
const ans: string[] = [];

const calc = (ten: string, repeat: string) => {
  let lg = 10 ** (ten.length + repeat.length);
  if (repeat) {
    lg -= 10 ** ten.length;
    ten = "" + (+(ten + repeat) - +ten);
  }
  return [BigInt(ten), BigInt(lg)];
};
const GCD: (n1: bigint, n2: bigint) => bigint = (n1: bigint, n2: bigint) =>
  !n2 ? n1 : GCD(n2, n1 % n2);
const convert = (str: string) => {
  const n = str.length;
  let bracket = false;
  let ten = "";
  let repeat = "";
  for (let i = 2; i < n; i++) {
    switch (str[i]) {
      case "(":
        bracket = true;
      case ")":
        break;
      default:
        bracket ? (repeat += str[i]) : (ten += str[i]);
        break;
    }
  }
  let [child, root] = calc(ten, repeat);
  const gcd = GCD(child, root);
  child /= gcd;
  root /= gcd;
  return `${child}/${root}`;
};

for (let i = 0; i < TC; i++) ans.push(convert(inp[i]));

console.log(ans.join("\n"));
