function solution(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  const map1 = new Map();
  const map2 = new Map();
  str1.split(/[^a-z]/g).forEach((li) => {
    const arr = li.split("");
    arr.forEach((el, i) => {
      if (arr[i + 1]) {
        const key = el + arr[i + 1];
        const val = map1.get(key);
        val ? map1.set(key, val + 1) : map1.set(key, 1);
      }
    });
  });
  str2.split(/[^a-z]/g).forEach((li) => {
    const arr = li.split("");
    arr.forEach((el, i) => {
      if (arr[i + 1]) {
        const key = el + arr[i + 1];
        const val = map2.get(key);
        val ? map2.set(key, val + 1) : map2.set(key, 1);
      }
    });
  });
  const intersect = new Map();
  const union = new Map();
  for (const [K, V] of map1.entries()) {
    const val = map2.get(K);
    union.set(K, V);
    val && intersect.set(K, Math.min(V, val));
  }
  for (const [K, V] of map2.entries()) {
    const val = union.get(K);
    val ? union.set(K, val + V) : union.set(K, V);
  }
  for (const [K, V] of intersect.entries()) {
    const val = union.get(K);
    union.set(K, val - V);
  }
  union.size || (union.set("a", 1), intersect.set("a", 1));
  return Math.floor(
    (65536 * [...intersect.values()].reduce((acc, cur) => acc + cur, 0)) /
      [...union.values()].reduce((acc, cur) => acc + cur, 0)
  );
}
