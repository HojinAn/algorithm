function solution(k, dungeons) {
  let ans = 0;
  const dfs = (depth, cur, visited) => {
    dungeons.forEach(([need, minus], i) => {
      if (!(visited & (1 << i)) && cur >= need) {
        dfs(depth + 1, cur - minus, visited | (1 << i));
      }
    });
    ans = Math.max(ans, depth);
  };
  dfs(0, k, 0);
  return ans;
}
