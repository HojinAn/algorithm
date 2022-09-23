function solution(m, musicinfos) {
  const ans = [];

  const getChord = (mStr) => {
    const q = [];
    const n = mStr.length;
    let str = "";
    for (let i = 0; i < n; i++) {
      str = mStr[i];
      if (mStr[i + 1] === "#") {
        str += "#";
        i++;
      }
      q.push(str);
    }
    return q;
  };

  const myChord = getChord(m);
  const n = myChord.length;

  const myChordSet = new Set(myChord);

  const canBe = (q) => {
    const len = q.length;
    let flag = false;
    for (let i = 0; i < len; i++) {
      if (myChord[0] === q[i]) {
        let idx = 1;
        while (idx < n) {
          if (myChord[idx] !== q[(i + idx) % len]) break;
          idx++;
        }
        if (idx === n) flag = true;
      }
    }
    return flag;
  };
  const getInfo = (str) => {
    const [start, end, tit, minfo] = str.trim().split(",");

    const mQ = getChord(minfo);

    const mInfoSet = new Set(mQ);

    for (const myChrd of myChordSet) if (!mInfoSet.has(myChrd)) return;

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    const interval = 60 * (endH - startH) + (endM - startM);

    const mLen = mQ.length;

    if (interval <= mLen)
      canBe(mQ.slice(0, interval)) && ans.push([tit, interval]);
    else canBe(mQ) && ans.push([tit, interval]);
  };

  musicinfos.forEach((el) => getInfo(el));

  let max = -1;

  ans.forEach((el) => (max = Math.max(max, el[1])));
  const answer = ans.filter((el) => el[1] === max);
  return answer[0] ? answer[0][0] : "(None)";
}
