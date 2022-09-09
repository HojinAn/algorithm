function solution(n) {
  const DIV = 1234567;
  const dp = [
    [0, 0],
    [1, 0],
    [1, 1],
  ];
  for (let i = 3; i <= n; i++)
    dp[i] = [
      dp[i - 1].reduce((a, b) => (a + b) % DIV),
      dp[i - 2].reduce((a, b) => (a + b) % DIV),
    ];
  return dp[n].reduce((a, b) => (a + b) % DIV);
}
