function solution(rows, columns, queries) {
    queries = queries.map((li) => li.map((el) => el - 1));
    const grid = [...Array(rows)].map((_, i) => [...Array(columns)].map((_, j) => i * columns + j + 1));
    
    const rotate = (result, [x1, y1, x2, y2]) => {
        const [dx, dy] = [x2 - x1, y2 - y1];
        const tmp = grid[x1][y1];
        let min = tmp;
        for (let i = 0; i < dx; i++) {
            grid[x1 + i][y1] = grid[x1 + i + 1][y1];
            min = Math.min(min, grid[x1 + i][y1]);
        }
        for (let i = 0; i < dy; i++) {
            grid[x2][y1 + i] = grid[x2][y1 + i + 1];
            min = Math.min(min, grid[x2][y1 + i]);
        }
        for (let i = 0; i < dx; i++) {
            grid[x2 - i][y2] = grid[x2 - i - 1][y2];
            min = Math.min(min, grid[x2 - i][y2]);
        }
        for (let i = 0; i < dy - 1; i++) {
            grid[x1][y2 - i] = grid[x1][y2 - i - 1];
            min = Math.min(min, grid[x1][y2 - i]);
        }
        grid[x1][y1 + 1] = tmp;
        result.push(min);
        return result;
    }
    
    return queries.reduce(rotate, []);
}