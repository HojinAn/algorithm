function solution(n, m) {
  const answer = [];
  if (n > m) [n, m] = [m, n];
  for (let i = n; i >= 2; i--)
    if (!(n % i) && !(m % i)) {
      answer[0] = i;
      break;
    }
  answer[1] = (n * m) / answer[0];
  return answer;
}

// 아주 깔끔한 풀이
const solution = (a, b) => {
    const ab = a * b;
    b < a && ([a,b]=[b,a]);
    let r = 0;
    for (; r = b % a; b = a, a = r) {}
    return [a, ab/a]
}