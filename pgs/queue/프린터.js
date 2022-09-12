function solution(priorities, location) {
  const nodes = [];
  priorities.forEach((el, i) => nodes.push([i, el]));
  let cnt = 0;
  while (true) {
    const max = Math.max(...nodes.map((el) => el[1]));
    const [idx, prio] = nodes.shift();
    if (prio < max) nodes.push([idx, prio]);
    else {
      cnt++;
      if (idx === location) return cnt;
    }
  }
}
