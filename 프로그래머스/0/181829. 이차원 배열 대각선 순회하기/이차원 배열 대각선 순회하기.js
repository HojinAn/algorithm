function solution(board, k) {
    return board.reduce((ans, li, r) => 
                        li.reduce((sum, el, c) => 
                                  r + c <= k ? sum + el : sum, ans), 0);
}