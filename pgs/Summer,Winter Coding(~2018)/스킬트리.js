function solution(skill, skill_trees) {
  let ans = 0;
  const order = skill.trim().split("");
  const len = skill.length;
  skill_trees.forEach((el) => {
    let tmp = "";
    el.trim()
      .split("")
      .forEach((it) => order.includes(it) && (tmp += it));
    for (let i = 0; i <= len; i++) {
      if (skill.slice(0, i) === tmp) {
        ans++;
        break;
      }
    }
  });
  return ans;
}
