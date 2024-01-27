function solution(order) {
    return order.reduce((result, o) => result + (o.includes('latte') ? 5000 : 4500), 0);
}