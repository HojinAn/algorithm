function solution(n) {
  const MOD = 1000000007;
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
  return dp[n] % MOD;
}
