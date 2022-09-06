function solution(nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let ans = 0;
  const set = new Set();
  const isPrime = (no) => {
    if (set.has(no)) return true;
    for (let i = 2; i * i <= no; i++) if (!(no % i)) return false;
    no >= 2 && set.add(no);
    return no >= 2;
  };
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        isPrime(nums[i] + nums[j] + nums[k]) && ans++;
      }
    }
  }
  return ans;
}
