let perfectPositions = [];

let nQueens = function (n) {
    if (n <= 0) return "No Solution!";
    let hasSolution = placeQueen(n, 0);
    return hasSolution ? perfectPositions : "No Solution!";
}

let placeQueen = function (n, row) {
    if (n === row) return true;
    for (var col = 0; col < n; col++) {
        let foundSafe = true;
        for (var queen = 0; queen < row; queen++) {
            let colOfQueenToBeChecked = perfectPositions[queen][1];
            let rowOfQueenToBeChecked = perfectPositions[queen][0];
            if (colOfQueenToBeChecked === col || Math.abs(rowOfQueenToBeChecked - row) === Math.abs(colOfQueenToBeChecked - col)) {
                foundSafe = false;
                break;
            }
        }

        if (foundSafe) {
            perfectPositions.push([row, col]);
            if (placeQueen(n, row + 1, perfectPositions)) {
                return true;
            }
        }
    }
    perfectPositions.pop();
    return false;
}

console.log(nQueens(8));