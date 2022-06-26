function solution(N, road, K) {
  const costs = Array(N + 1).fill(20000001);
  const villages = [...Array(N + 1)].map((x) => []);
  road.forEach((el) => {
    const [from, to, weight] = el;
    villages[from].push([to, weight]);
    villages[to].push([from, weight]);
  });
  costs[1] = 0;
  const pq = [[1, 0]];
  while (pq.length) {
    const [curNo, curCost] = pq.pop();
    villages[curNo].forEach((el) => {
      const [next, nextCost] = el;
      const newCost = curCost + nextCost;
      if (costs[next] > newCost) {
        costs[next] = newCost;
        pq.push([next, costs[next]]);
      }
    });
  }
  return costs.filter((el) => el <= K).length;
}
