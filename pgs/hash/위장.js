function solution(clothes) {
  const map = new Map();
  clothes.forEach(([V, K]) => {
    const set = map.get(K) ?? new Set();
    set.add(V);
    map.set(K, set);
  });
  let cnt = 1;
  for (const set of map.values()) cnt *= set.size + 1;
  return cnt - 1;
}
