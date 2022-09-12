function solution(operations) {
  const q = [];
  operations.forEach((el) => {
    const [cmd, num] = el.trim().split(" ");
    switch (cmd) {
      case "I":
        q.push(+num);
        break;
      case "D":
        num === "1" ? q.pop() : q.shift();
        break;
    }
    q.sort((a, b) => a - b);
  });
  return [q[q.length - 1] ? q[q.length - 1] : 0, q[0] ? q[0] : 0];
}
