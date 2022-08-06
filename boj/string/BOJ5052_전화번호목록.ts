import * as fs from "fs";
const inp = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let idx = 0,
  t = +inp[idx++],
  answer = "";
while (t--) {
  const n = +inp[idx++],
    phoneNo = inp.slice(idx, (idx += n));
  let yes = true;
  phoneNo.sort();
  phoneNo.slice(1).forEach((el, i) => {
    const prev = phoneNo[i];
    prev === el.slice(0, prev.length) && (yes = false);
  });
  answer += `${yes ? "YES" : "NO"}\n`;
}
console.log(answer.trim());
