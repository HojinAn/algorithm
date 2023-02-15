function solution(numbers) {
  var answer = [];

  const depthCnt = [0, 1, 3, 7, 15, 31, 63];
  const toBiStr = (no) => {
    let str = no.toString(2);
    const n = str.length;
    let idx = 1;
    if (n > 31) idx = 6;
    else if (n > 15) idx = 5;
    else if (n > 7) idx = 4;
    else if (n > 3) idx = 3;
    else if (n > 1) idx = 2;
    str = str.padStart(depthCnt[idx], 0);
    return [str, idx];
  };
  const dfs = (str, depth, lBound, rBound) => {
    if (depth === 1) {
      return [str[lBound], true];
    }
    const rangeStr = str.slice(lBound, rBound);
    const parentIdx = depthCnt[depth - 1];
    const parent = rangeStr[parentIdx];
    const [lChild, lOk] = dfs(str, depth - 1, lBound, lBound + parentIdx);
    const [rChild, rOk] = dfs(str, depth - 1, lBound + parentIdx + 1, rBound);
    const ok = !(parent === "0" && (lChild === "1" || rChild === "1"));
    const val = parent === "0" && lChild === "0" && rChild === "0" ? "0" : "1";
    return [val, ok && lOk && rOk];
  };
  const isValid = (no) => {
    const [biStr, depth] = toBiStr(no);
    return dfs(biStr, depth, 0, depthCnt[depth])[1] ? 1 : 0;
  };
  numbers.forEach((el) => answer.push(isValid(el)));
  return answer;
}
