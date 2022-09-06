function solution(nums) {
  var answer = 0;
  const set = new Set();
  nums.forEach((el) => {
    set.add(el);
  });
  if (set.size <= parseInt(nums.length / 2)) return set.size;
  else return parseInt(nums.length / 2);
}
