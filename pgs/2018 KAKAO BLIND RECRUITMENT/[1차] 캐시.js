function solution(cacheSize, cities) {
  const cache = [];
  let time = 0;
  if (cacheSize) {
    cities.forEach((el) => {
      el = el.toLowerCase();
      if (cache.includes(el)) {
        time++;
        cache.splice(cache.indexOf(el), 1);
        cache.push(el);
      } else {
        if (cache.length === cacheSize) cache.shift();
        cache.push(el);
        time += 5;
      }
    });
  } else time = 5 * cities.length;
  return time;
}
