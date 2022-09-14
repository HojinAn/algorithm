function solution(record) {
  const map = new Map();
  const orders = [];
  record.forEach((el, i) => {
    const [cmd, id, nickname] = el.trim().split(" ");
    switch (cmd) {
      case "Enter":
        map.set(id, nickname);
      case "Leave":
        orders.push([id, cmd]);
        break;
      case "Change":
        map.set(id, nickname);
        break;
    }
  });
  return orders.map(
    ([id, cmd]) =>
      `${map.get(id)}님이 ${cmd === "Enter" ? "들어왔습니다" : "나갔습니다"}.`
  );
}
