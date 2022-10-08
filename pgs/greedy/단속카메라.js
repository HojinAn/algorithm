function solution(routes) {
  routes.sort((a, b) => a[1] - b[1]);
  let pos = routes[0][1];
  let answer = 1;
  routes.forEach(([from, to]) => {
    if (pos < from) {
      pos = to;
      answer++;
    }
  });
  return answer;
}
