//Found this on github by jthomas
//Way too comlpicated for me.. tried to trace it.

var iterations = 0


var has_conflict = function (columns) {
    let len = columns.length;
    let last = columns[len - 1];
    let previous = len - 2;
    //    let colOfPrevious = columns[previous]; 
    // funny if i uncomment the above line and replace columns[previous] with colOfPrevious, the program retruns null

    while (previous >= 0) {
        if (columns[previous] === last) return true
        if (last - (len - 1) === columns[previous] - previous) return true
        if (last + (len - 1) === columns[previous] + previous) return true
        previous--
    }

    return false
}

var place_next_queen = function (total, queens, columns) {
    if (queens === 0) return columns
    columns = columns || []

    for (var column = 0; column < total; column++) {
        columns.push(column)
        iterations++
        if (!has_conflict(columns) &&
            place_next_queen(total, queens - 1, columns)) {
            return columns
        }
        columns.pop(column)
    }

    return null
}

console.log(place_next_queen(4, 4));
console.log('\niterations: ', iterations)