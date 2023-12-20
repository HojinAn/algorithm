function solution(num_str) {
    return num_str.trim().split("").map(Number).reduce((acc, num)=>acc+num);
}