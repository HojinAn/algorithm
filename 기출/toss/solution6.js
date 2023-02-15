function solution(pin) {
  var answer = true;
  const used = [...Array(10)].map(() => []);
  for (let i = 0; i < 4; i++) used[+pin[i]].push(i);
  for (let i = 0; i < 10; i++) if (used.length > 3) return false;
  return true;
}
console.log(solution("0000"));
