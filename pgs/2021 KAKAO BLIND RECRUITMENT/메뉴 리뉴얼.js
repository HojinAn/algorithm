function solution(orders, course) {
  const counter = new Map();
  const maxArr = Array(11).fill(0);
  const subSet = (depth, key, str, n) => {
    if (depth === n) {
      if (key) {
        key = key.split("").sort().join("");
        counter.set(key, (counter.get(key) ?? 0) + 1);
        maxArr[key.length] = Math.max(maxArr[key.length], counter.get(key));
      }
      return;
    }
    subSet(depth + 1, key + str[depth], str, n);
    subSet(depth + 1, key, str, n);
  };
  orders.forEach((el) => subSet(0, "", el, el.length));
  const candidates = [...counter.entries()]
    .filter(
      ([k, v]) =>
        k.length >= 2 &&
        v >= 2 &&
        course.includes(k.length) &&
        v === maxArr[k.length]
    )
    .sort(([a1, a2], [b1, b2]) => {
      if (b2 === a2) return b1.length - a1.length;
      else return b2 - a2;
    });
  return candidates.map((el) => el[0]).sort();
}
