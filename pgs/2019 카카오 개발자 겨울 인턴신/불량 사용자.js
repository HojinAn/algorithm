const solution = (user_id, banned_id) => {
  const n = user_id.length;
  const k = banned_id.length;
  const set = new Set();

  const areSame = (str, ban) => {
    const len = str.length;
    if (len !== ban.length) return false;
    for (let i = 0; i < len; i++) {
      if (ban[i] === "*") continue;
      if (ban[i] !== str[i]) return false;
    }
    return true;
  };

  const permu = (depth, visited, arr) => {
    if (depth === k) {
      for (let i = 0; i < k; i++) if (!areSame(arr[i], banned_id[i])) return;
      set.add(arr.sort().join(""));
      return;
    }
    for (let i = 0; i < n; i++)
      if (!(visited & (1 << i)))
        permu(depth + 1, visited | (1 << i), [...arr, user_id[i]]);
  };

  permu(0, 0, []);

  return set.size;
};
