
class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
}

let nQueens = function (n) {

    if (n <= 0) return "No Solution!";
    let perfectPositions = [];
    let hasSolution = placeQueen(n, 0, perfectPositions);
    return hasSolution ? perfectPositions : "No Solution!";
}

let placeQueen = function (n, row, perfectPositions) {
    if (n === row) return true;
    for (var col = 0; col < n; col++) {
        let foundSafe = true;
        for (var queen = 0; queen < row; queen++) {
            let ArrOfQueenCol = perfectPositions[queen].col;
            let ArrOfQueenRow = perfectPositions[queen].row;
            if (ArrOfQueenCol === col || Math.abs(ArrOfQueenRow - row) === Math.abs(ArrOfQueenCol - col)) {
                foundSafe = false;
                break;
            }
        }

        if (foundSafe) {
            perfectPositions.push(new Position(row, col));
            if (placeQueen(n, row + 1, perfectPositions)) {
                return true;
            }
        }
    }
    return false;
}

console.log(nQueens(4));