function toArray(subject) {
    return Array.prototype.slice.call(subject);
}

function elements(selectors, subject) {
    return toArray((subject || document).querySelectorAll(selectors));
}

// transposes (swaps) a matrix
function transpose(matrix) {
    return matrix.map(function(row, index, matrix) {
        return matrix.map(function(row) {
            return row[index];
        });
    });
}

document.addEventListener('DOMContentLoaded', function documentLoaded() {
    var fields = elements('.board .field');

    fields.forEach(function(field) {
        field.addEventListener('change', checkGameState);
    });

});

function checkGameState() {
    console.log('checking game state...');
    // console.log('claimedFields', fieldValues());

    if (checkRows(values())
        || checkColumns(values())
        || checkDiagonal(values()))
    {
        console.log('game finished');
    }
}

// returns a matrix of values
function values() {
    return elements('.board tr').map(function(row) {
        return rowValues(row);
    });
}

// returns array of values from table row
function rowValues(row) {
    return elements('.field', row).map(function(field) {
        return field.checked;
    });
}

function checkRows(values) {
    return values.filter(function(row) {
        return checkRow(row);
    }).length > 0;
}

// returns if all row values are true
function checkRow(row) {
    return row.filter(function(value) {
        return !value;
    }).length === 0;
}

function checkColumns(values) {
    return checkRows(transpose(values));
}

function checkDiagonal(values) {
    return checkRows([diagonalValuesDescending(values),
                     diagonalValuesAscending(values)]);
}

function diagonalValuesDescending(values) {
    return values.map(function(row, index) {
        return row[index];
    });
}

function diagonalValuesAscending(values) {
    return values.map(function(row, index) {
        return row[(values.length - 1) - index];
    });
}
