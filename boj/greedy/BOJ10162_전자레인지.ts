import * as fs from "fs";
let T = +fs.readFileSync("/dev/stdin").toString().trim();
const times = [300, 60, 10];
times.forEach((el, i) => {
  times[i] = Math.floor(T / el);
  T %= el;
});
if (T) console.log("-1");
else {
  let ans = "";
  times.forEach((el) => (ans += `${el} `));
  console.log(ans);
}
