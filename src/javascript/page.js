function toArray(subject) {
    return Array.prototype.slice.call(subject);
}

function elements(selectors, subject) {
    return toArray((subject || document).querySelectorAll(selectors));
}

// transposes a matrix (swaps rows and columns)
function transpose(matrix) {
    return matrix.map(function(row, index, matrix) {
        return matrix.map(function(row) {
            return row[index];
        });
    });
}

document.addEventListener('DOMContentLoaded', function documentLoaded() {
    var fields = elements('.board .field'),
        resetButton = elements('.reset')[0];

    fields.forEach(function(field) {
        field.addEventListener('change', function() {
            checkGameState(fields, resetButton);
        });
    });

    resetButton.addEventListener('click', function() {
        resetGame(fields);
    });
});

function checkGameState(fields, resetButton) {
    if (isGameFinished()) {
        fields.forEach(function(field) {
            field.disabled = true;
        });
        resetButton.disabled = false;
    } else {
        fields.forEach(function(field) {
            field.disabled = false;
        });
        resetButton.disabled = true;
    }
}

function isGameFinished() {
    return (hasCompleteRow(values())
        || hasCompleteColumn(values())
        || hasCompleteDiagonal(values()));
}

function resetGame(fields) {
    fields.forEach(function(field) {
        uncheckField(field);
    });
}

function uncheckField(field) {
    field.checked = false;
    field.dispatchEvent(new Event('change', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    }));
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

function hasCompleteRow(values) {
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

function hasCompleteColumn(values) {
    return hasCompleteRow(transpose(values));
}

function hasCompleteDiagonal(values) {
    return hasCompleteRow([diagonalValuesDescending(values),
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
