function solution(park, routes) {
    routes = routes.map((str) => {
        const [op, s] = str.split(' ');
        return [op, +s];
    })
    const R = park.length;
    const C = park[0].length;
    const N = 'N';
    const S = 'S';
    const E = 'E';
    const W = 'W';
    const BLOCK = 'X';
    
    const findStartCoords = () => {
        for (let r = 0; r < R; r++)
            for (let c = 0; c < C; c++)
                if (park[r][c] === 'S') return [r, c];

        return [0, 0];
    }
    
    const isInRange = ([r, c]) => 0 <= r && r < R && 0 <= c && c < C;
    
    const isBlocked = ([r, c], [op, n]) => {
        switch(op) {
            case E:
                for (let i = 1; i <= n; i++) if (park[r][c + i] === BLOCK) return true;
                break;
            case W:
                for (let i = 1; i <= n; i++) if (park[r][c - i] === BLOCK) return true;
                break;
            case N:
                for (let i = 1; i <= n; i++) if (park[r - i][c] === BLOCK) return true;
                break;
            case S:
                for (let i = 1; i <= n; i++) if (park[r + i][c] === BLOCK) return true;
                break;
        }
        return false;
    }
    
    const getNextCoords = ([r, c], [op, n]) => {
        switch(op) {
            case E:
                return [r, c + n];
            case W:
                return [r, c - n];
            case N:
                return [r - n, c];
            case S:
                return [r + n, c];
        }
    }
    
    const operateRoute = (coords, routes) => {
        const [nr, nc] = getNextCoords(coords, routes);
        if (isInRange([nr, nc])) {
            if (isBlocked(coords, routes)) return coords;
            return [nr, nc];
        }
        return coords;
    }
    
    return routes.reduce(operateRoute, findStartCoords());
}