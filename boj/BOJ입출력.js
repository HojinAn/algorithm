// Ctrl+c 또는 Ctrl+d로 입력 종료
// readline 모듈 이용
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = []; // input 배열 선언
rl.on("line", function (line) {
  input.push(line); // 입력받는 각 줄의 값을 input 배열에 저장
}).on("close", function () {
  solution(input);
  process.exit();
});
///////////////////////////////////////////////////
// 다른 방법
///////////////////////////////////////////////////
// 이하 fs 모듈 이용
const fs = require("fs");
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 입력받는 문자열 자체를 개행 기준으로 split해서 input에 저장
