/**
 * 최우선 목표는 서비스 가입자 수 최대로 늘리는 것
 * 그 다음이 이모티콘 판매액 늘리기
 */
function solution(users, emoticons) {
  const n = emoticons.length;
  const answer = [];
  const getRstByRate = (rateArr) => {
    let regiCnt = 0;
    let income = 0;
    users.forEach(([rateReq, costLimit]) => {
      let fee = 0;
      rateArr.forEach(([cost, rate]) => {
        if (rate >= rateReq) fee += (cost * (100 - rate)) / 100;
      });
      if (fee >= costLimit) regiCnt++;
      else income += fee;
    });
    answer.push([regiCnt, income]);
  };
  const dfs = (cnt, costNRate) => {
    if (cnt === n) {
      getRstByRate(costNRate);
      return;
    }
    for (let i = 1; i <= 4; i++) {
      const arr = [...costNRate];
      arr.push([emoticons[cnt], i * 10]);
      dfs(cnt + 1, arr);
    }
  };
  dfs(0, []);
  answer.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]));
  return answer[0];
}
