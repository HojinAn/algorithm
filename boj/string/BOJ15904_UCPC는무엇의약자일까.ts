import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString().trim();
const obj: { [key: string]: number[] } = { U: [], C: [], P: [] };
const { length } = str;
for (let i = 0; i < length; i++) obj[str[i]]?.push(i);
const U = obj["U"][0];
let C1 = -1;
for (const el of obj["C"]) {
  if (el > U) {
    C1 = el;
    break;
  }
}
let P = -1;
for (const el of obj["P"]) {
  if (el > C1) {
    P = el;
    break;
  }
}
let C2 = C1;
for (const el of obj["C"]) {
  if (el > P) {
    C2 = el;
    break;
  }
}
console.log(
  U !== undefined && U < C1 && C1 < P && P < C2 ? "I love UCPC" : "I hate UCPC"
);
