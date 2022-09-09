function solution(brown, yellow) {
  const total = brown + yellow;
  const sum = brown / 2 + 2;
  for (let i = 1; i ** 2 <= total; i++) {
    if (!(total % i)) {
      if (i + total / i === sum) return [total / i, i];
    }
  }
}
