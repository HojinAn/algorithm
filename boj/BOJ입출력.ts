// Ctrl+c 또는 Ctrl+d로 입력 종료
// readline 모듈 이용
import * as readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input: string[] = []; // input 배열 선언
const solution = (input: string[]) => {};
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
import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 입력받는 문자열 자체를 개행 기준으로 split해서 input에 저장
// fs 모듈 오류 발생시 밑에처럼 수정해보기
// file path: process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
