function solution(arr) {
  const LCM = (n, m) => {
    const i = n,
      j = m;
    let a;
    if (n < m) [n, m] = [m, n];
    while (m) {
      a = n % m;
      n = m;
      m = a;
    }
    return (i * j) / n;
  };
  let lcm = arr[0];
  for (let i = 1, len = arr.length; i < len; i++) lcm = LCM(lcm, arr[i]);
  return lcm;
}

// 나이스 풀이
function solution(arr) {
  const gcd = (a, b) => (a % b ? gcd(b, a % b) : b);
  return arr.reduce((acc, cur) => (acc * cur) / gcd(acc, cur));
}
