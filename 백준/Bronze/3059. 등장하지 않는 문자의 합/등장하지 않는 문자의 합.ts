import * as readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input: string[] = []; // input 배열 선언

rl.on('line', function (line) {
  input.push(line); // 입력받는 각 줄의 값을 input 배열에 저장
}).on('close', function () {
  console.log(solution(input.slice(1)).join('\n'));
  process.exit();
});

function solution(inp: string[]) {
  const result: number[] = [];
  for (const str of inp) {
    const set = new Set(str.split(''));
    const sum = Array.from({ length: 26 }, (_, i) => i + 65)
      .filter((v) => !set.has(String.fromCharCode(v)))
      .reduce((acc, cur) => acc + cur, 0);
    result.push(sum);
  }
  return result;
}
