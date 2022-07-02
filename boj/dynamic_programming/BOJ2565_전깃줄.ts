import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = +inputList[0];
const arr: number[] = [...Array(501)];
const LIS: number[] = [];

let from, to;
inputList.slice(1).forEach((el) => {
  [from, to] = el.trim().split(" ").map(Number);
  arr[from] = to;
});

let idx = 0,
  flag;
arr.forEach((el) => {
  el &&
    (() => {
      flag = true;
      for (let i = 0; i < idx; i++) {
        if (LIS[i] > el) {
          LIS[i] = el;
          flag = false;
          break;
        }
      }
      flag &&
        (() => {
          LIS[idx++] = el;
        })();
    })();
});

console.log(n - LIS.length);
