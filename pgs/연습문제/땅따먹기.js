function solution(land) {
  const dp = [land[0], [0, 0, 0, 0]];
  for (let i = 1; i < land.length; i++) {
    const cur = i % 2;
    const prev = (i - 1) % 2;
    dp[cur][0] = land[i][0] + Math.max(dp[prev][1], dp[prev][2], dp[prev][3]);
    dp[cur][1] = land[i][1] + Math.max(dp[prev][0], dp[prev][2], dp[prev][3]);
    dp[cur][2] = land[i][2] + Math.max(dp[prev][1], dp[prev][0], dp[prev][3]);
    dp[cur][3] = land[i][3] + Math.max(dp[prev][1], dp[prev][2], dp[prev][0]);
  }
  let max = 0;
  dp.forEach((li) => li.forEach((el) => (max = Math.max(max, el))));
  return max;
}

// reduce를 활용한 훌륭한 풀이

function solution(land) {
  return Math.max(
    ...land.reduce(
      (a, c) => {
        return [
          c[0] + Math.max(a[1], a[2], a[3]),
          c[1] + Math.max(a[0], a[2], a[3]),
          c[2] + Math.max(a[0], a[1], a[3]),
          c[3] + Math.max(a[0], a[1], a[2]),
        ];
      },
      [0, 0, 0, 0]
    )
  );
}
