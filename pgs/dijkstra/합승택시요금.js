function solution(n, s, a, b, fares) {
  const MAX_VALUE = 200000001;
  let answer = MAX_VALUE;
  const nodes = [...Array(n + 1)].map((x) => []);
  fares.forEach((el) => {
    const [from, to, cost] = el;
    nodes[from].push([to, cost]);
    nodes[to].push([from, cost]);
  });
  const pq = [];
  const dijkstra = (start) => {
    const costs = Array(n + 1).fill(MAX_VALUE);
    costs[start] = 0;
    pq.push([start, 0]);
    let curNo, curCost, nextNo, nextCost, newCost;
    while (pq.length) {
      [curNo, curCost] = pq.pop();
      nodes[curNo].forEach((el) => {
        [nextNo, nextCost] = el;
        newCost = curCost + nextCost;
        if (costs[nextNo] > newCost) {
          costs[nextNo] = newCost;
          pq.push([nextNo, costs[nextNo]]);
        }
      });
    }
    return costs;
  };
  const aCost = dijkstra(a);
  const bCost = dijkstra(b);
  const sCost = dijkstra(s);
  for (let i = 1; i <= n; i++)
    answer = Math.min(answer, aCost[i] + bCost[i] + sCost[i]);
  return answer;
}
