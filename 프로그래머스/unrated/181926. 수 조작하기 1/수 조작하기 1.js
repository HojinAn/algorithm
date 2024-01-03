function solution(n, control) {
    return control.split("").reduce((num, d) => {
        switch (d) {
            case "w":
                return num + 1;
            case "s":
                return num - 1;
            case "d":
                return num + 10;
            case "a":
                return num - 10;
            default:
                return num;
        }
    }, n);
}