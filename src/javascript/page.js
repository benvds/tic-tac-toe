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
    var players = ['red', 'blue'],
        currentPlayerIndex = 0,
        turn = elements('.turn')[0],
        fields = elements('.board .field'),
        resetButton = elements('.reset')[0],
        result = elements('.result')[0];

    fields.forEach(function(field) {
        field.addEventListener('change', function() {

            if (field.checked) {
                field.value = players[currentPlayerIndex];
                field.disabled = true;
                field.parentElement.bgColor = players[currentPlayerIndex];
                currentPlayerIndex = nextPlayerIndex(players, currentPlayerIndex);
            } else {
                field.value = '';
                field.disabled = false;
                field.parentElement.bgColor = 'white';
            }

            checkGameState(players, fields, result, turn, currentPlayerIndex);
        });
    });

    resetButton.addEventListener('click', function() {
        resetGame(fields, result);
    });

    checkGameState(players, fields, result, turn, currentPlayerIndex);
});

function nextPlayerIndex(players, index) {
    return ((players.length - 1) > index) ? index + 1 : 0;
}

function checkGameState(players, fields, result, turn, currentPlayerIndex) {
    var winner = hasPlayerWon(players);

    if (winner) {
        result.innerHTML = 'winner: ' + winner;
        turn.innerHTML = '';
        disableFields(fields);
    } else if (areAllValuesSet()) {
        result.innerHTML = 'draw';
        turn.innerHTML = '';
        disableFields(fields);
    } else {
        turn.innerHTML = players[currentPlayerIndex];
    }
}

function disableFields(fields) {
    fields.forEach(function(field) {
        field.disabled = true;
    });
}

function resetGame(fields, result) {
    fields.forEach(function(field) {
        uncheckField(field);
    });
    result.innerHTML = '';
}

function uncheckField(field) {
    field.checked = false;
    field.dispatchEvent(new Event('change', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    }));
}

// function isGameFinished(players) {
//     return () || hasPlayerWon(players);
// }

function areAllValuesSet() {
    return elements('.board .field:not(:checked)').length === 0;
}

function hasPlayerWon(players) {
    return players.filter(function(player) {
        var values = playerValues(player);

        return (hasCompleteRow(values)
            || hasCompleteColumn(values)
            || hasCompleteDiagonal(values));
    })[0];
}

// returns a matrix of values
function playerValues(player) {
    return elements('.board tr').map(function(row) {
        return rowValues(row, player);
    });
}

// returns array of values from table row
function rowValues(row, player) {
    return elements('.field', row).map(function(field) {
        return field.checked && field.value === player;
    });
}

function hasCompleteRow(values) {
    return values.filter(function(row) {
        return checkRow(row);
    }).length;
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
