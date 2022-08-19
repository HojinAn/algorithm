import * as fs from "fs";
const str = fs.readFileSync("/dev/stdin").toString().trim().split(""),
  n = str.length,
  isPal = (str: string[]) => {
    let l = 0,
      r = str.length - 1;
    while (l <= r) {
      if (str[l] !== str[r]) return false;
      l++, r--;
    }
    return true;
  };
let ans = 0;
for (let i = 0; i < n; i++)
  if (isPal(str.slice(i))) break;
  else ans++;
console.log(ans + n);
