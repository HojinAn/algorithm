/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(prices) {
    return prices.reduce(({diff, min}, no) => {
        diff = Math.max(diff, no - min);
        min = Math.min(min, no);
        return {diff, min}
    }, {diff:0, min:10000}).diff;
};