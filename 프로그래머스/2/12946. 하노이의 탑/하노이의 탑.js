const routes = [];

function solution(n) {
    hanoi(n, 1, 3, 2);
	return routes;
}

function hanoi(n, from, to, via) {
    if (n === 1) {
        routes.push([from, to]);
        return;
    }
    hanoi(n - 1, from, via, to);
    hanoi(1, from, to, via);
    hanoi(n - 1, via, to, from);
}