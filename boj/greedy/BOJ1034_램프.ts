import * as fs from "fs";
const [str1, ...lampStates] = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [n, m] = str1.trim().split(" ").map(Number);
const k = Number(lampStates.pop());
const counter = new Map<string, number>();
lampStates.forEach((el) => {
  const val = counter.get(el);
  val ? counter.set(el, val + 1) : counter.set(el, 1);
});
const cntArr = Array.from(counter).sort((a, b) => b[1] - a[1]);
const isAvailable = (str: string) => {
  let zero = 0;
  for (let i = 0; i < m; i++) {
    switch (str[i]) {
      case "0":
        zero++;
        break;
      default:
        break;
    }
  }
  if (zero > k) return false;
  return !((k - zero) % 2);
};
(() => {
  for (const [target, val] of cntArr) {
    if (isAvailable(target)) {
      console.log(val);
      return;
    }
  }
  console.log(0);
})();
