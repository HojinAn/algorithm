function solution(id_list, report, k) {
  const reportMap = new Map();
  const cntMap = new Map();
  id_list.forEach((el) => {
    reportMap.set(el, new Set());
    cntMap.set(el, 0);
  });
  report.forEach((el) => {
    const [from, to] = el.split(" ");
    const reportSet = reportMap.get(to);
    reportSet.add(from);
  });
  reportMap.forEach((el, i) => {
    if (el.size >= k) {
      el.forEach((it) => {
        const val = cntMap.get(it);
        cntMap.set(it, val + 1);
      });
    }
  });
  return Array.from(cntMap.values());
}
