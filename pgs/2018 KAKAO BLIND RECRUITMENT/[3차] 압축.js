function solution(msg) {
  const answer = [];
  const dict = new Map(
    [...Array(26)].map((_, i) => [
      String.fromCharCode(i + "A".charCodeAt(0)),
      i + 1,
    ])
  );
  const n = msg.length;
  const compress = (str, idx) => {
    if (dict.get(str) === undefined) {
      answer.push(dict.get(str.slice(0, -1)));
      dict.set(str, dict.size + 1);
      return idx - 1;
    }
    if (idx === n - 1) {
      answer.push(dict.get(str));
      return idx;
    }
    return compress(str + msg[idx + 1], idx + 1);
  };
  for (let i = 0; i < n; i++) i = compress(msg[i], i);
  return answer;
}
