// import * as fs from "fs";
// const str = fs.readFileSync("/dev/stdin").toString().trim(),
// { length } = str,
// ans: string[] = [];
// for (let i = 0; i < length; i++) {
//   const el: string[] = [];
//   switch (str[i]) {
//     case "<":
//       while (str[i] !== ">") ans.push(str[i++]);
//       ans.push(str[i++]);
//       break;
//       case " ":
//         ans.push(str[i++]);
//         break;
//         default:
//           while (str[i] !== " " && str[i] !== "<" && i < length) el.push(str[i++]);
//           break;
//         }
//         i--;
//         el.reverse();
//         el.length && ans.push(el.join(""));
//       }
//       console.log(ans.join(""));

import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString().trim();
console.log(
  str.replace(/<[a-z0-9 ]+>|[a-z0-9]+/g, (match) =>
    match.startsWith("<") ? match : match.split("").reverse().join("")
  )
);
