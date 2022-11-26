import * as fs from 'fs';
const [str1, ...input] = fs
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [, , B] = str1.trim().split(' ').map(Number);
const grounds = input.map((el) => el.trim().split(' ').map(Number));

console.log(
  [...Array(257)]
    .map((_, i) => i)
    .reduce(
      (ans, height) => {
        const { time, cnt } = grounds.reduce(
          ({ time, cnt }, li) => {
            return {
              time: li.reduce((t, el) => {
                const diff = Math.abs(height - el);
                height > el
                  ? ((cnt += diff), (t += diff))
                  : ((cnt -= diff), (t += 2 * diff));
                return t;
              }, time),
              cnt,
            };
          },
          { time: 0, cnt: 0 }
        );
        if (cnt <= B)
          ans[0] > time && ([ans[0], ans[1]] = [time, height]),
            ans[0] === time && (ans[1] = Math.max(ans[1], height));
        return ans;
      },
      [Number.MAX_VALUE, 0]
    )
    .join(' ')
);
