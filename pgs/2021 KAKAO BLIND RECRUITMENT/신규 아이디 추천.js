function solution(new_id) {
  // 1단계
  new_id = new_id.toLowerCase();
  // 2단계
  new_id = new_id.replace(/[^a-z0-9-_.]/g, "");
  // 3단계
  new_id = new_id.replace(/[.]+/g, ".");
  // 4단계
  new_id[0] === "." && (new_id = new_id.slice(1));
  new_id[new_id.length - 1] === "." && (new_id = new_id.slice(0, -1));
  // 5단계
  new_id || (new_id = "a");
  new_id = new_id.slice(0, 15);
  // 6단계
  new_id[new_id.length - 1] === "." && (new_id = new_id.slice(0, -1));
  // 7단계
  while (new_id.length < 3) new_id += new_id[new_id.length - 1];
  return new_id;
}
