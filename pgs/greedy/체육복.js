function solution(n, lost, reserve) {
  let answer = 0;
  reserve.sort((a, b) => a - b);
  lost.sort((a, b) => a - b);
  const reserve_filtered = reserve.filter((el) => !lost.includes(el));
  const lost_filtered = lost.filter((el) => !reserve.includes(el));
  const min = n - lost_filtered.length;
  const reserveArr = Array(n + 1).fill(0);
  reserve_filtered.forEach((el) => (reserveArr[el] = 1));
  lost_filtered.forEach((el) => {
    const before = el - 1;
    const next = el + 1;
    if (reserveArr[before]) {
      answer++;
      reserveArr[before] = 0;
    } else if (reserveArr[next]) {
      answer++;
      reserveArr[next] = 0;
    }
  });
  return answer + min;
}
