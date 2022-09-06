function solution(numbers) {
  const n = numbers.length;
  const set = new Set();
  const combi = (cnt, start, sum, visited) => {
    if (cnt === 2) {
      set.add(sum);
      return;
    }
    for (let i = start; i < n; i++)
      if (!(visited & (1 << i)))
        combi(cnt + 1, i, sum + numbers[i], visited | (1 << i));
  };
  combi(0, 0, 0, 0);
  return Array.from(set).sort((a, b) => a - b);
}
