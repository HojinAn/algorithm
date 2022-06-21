const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 입력 처리

const [str1, str2] = input;
// 1 ≤ N ≤ 1,000,000
const n = +str1;
// 1 ≤ Ai ≤ 1,000,000
const arr = str2.trim().split(" ").map(Number);

// 이분탐색을 통한 target 값의 lowerbound 구하기
const lowerBound = (arr, r, target) => {
  let l = 0;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    if (arr[mid] >= target) r = mid;
    else l = mid + 1;
  }
  return r;
};

// 증가하는 수열 담아둘 LIS 배열
const LIS = Array(n + 1).fill(0);
// LIS의 현재 범위를 알려줄 idx
let idx = 0;
arr.forEach((num) => {
  // LIS에 들어있는 값이 배열의 현재 el보다 크거나 같으면 lowerbound를 구해서 갱신한다.
  if (LIS[idx] >= num) LIS[lowerBound(LIS, idx, num)] = num;
  // 작다면 다음 위치에 el 넣기
  else LIS[++idx] = num;
});

console.log(idx);
