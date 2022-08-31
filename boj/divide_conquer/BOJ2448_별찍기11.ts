// import * as fs from "fs";
// const n = +fs.readFileSync("/dev/stdin").toString();
// const dp: string[][] = [];
// const star = (num: number) => {
//   const idx = Math.log2(Math.floor(num / 3));
//   if (dp[idx]) return dp[idx];
//   if (num === 3) return (dp[idx] = ["*", "* *", "*****"]);
//   const next = Math.floor(num / 2);
//   dp[idx] = [];
//   for (let i = 0; i < next; i++) dp[idx][i] = star(next)[i];
//   for (let i = next; i < num; i++) {
//     const k = i - next;
//     dp[idx][i] = star(next)[k];
//     for (let j = num; j > 2 * k + 1; j--) dp[idx][i] += " ";
//     dp[idx][i] += star(next)[k];
//   }
//   return dp[idx];
// };
// star(n);
// let no = n;
// console.log(
//   dp[Math.log2(Math.floor(n / 3))]
//     .reduce((acc, cur) => {
//       let space = "";
//       for (let i = 1; i < no; i++) space += " ";
//       no--;
//       return acc + space + cur + space + "\n";
//     }, "")
//     .slice(0, -1)
// );

/////////////////////////////////////////////////////////////////

import * as fs from "fs";
const n = +fs.readFileSync("/dev/stdin").toString();

const getStars = (no: number) => {
  const result: string[] = [];
  if (no === 3) {
    result.push("  *  ");
    result.push(" * * ");
    result.push("*****");
  } else {
    const half = no / 2;
    const space = " ".repeat(half);
    const stars = getStars(half);
    stars.forEach((star) => result.push(`${space}${star}${space}`));
    stars.forEach((star) => result.push(`${star} ${star}`));
  }
  return result;
};
console.log(getStars(n).join("\n"));
