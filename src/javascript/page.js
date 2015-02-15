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
        fields = elements('.board .field'),
        resetButton = elements('.reset')[0];

    fields.forEach(function(field) {
        field.addEventListener('change', function() {

            if (field.checked) {
                field.value = players[currentPlayerIndex];
                field.parentElement.bgColor = players[currentPlayerIndex];
                currentPlayerIndex = nextPlayerIndex(players, currentPlayerIndex);
            } else {
                field.value = '';
                field.parentElement.bgColor = 'white';
            }

            checkGameState({
                players: players,
                fields: fields,
            });
        });
    });

    resetButton.addEventListener('click', function() {
        resetGame(fields);
    });
});

function nextPlayerIndex(players, index) {
    return ((players.length - 1) > index) ? index + 1 : 0;
}

// takes options with players, fields
function checkGameState(options) {
    if (isGameFinished(options.players)) {
        options.fields.forEach(function(field) {
            field.disabled = true;
        });
    } else {
        options.fields.forEach(function(field) {
            field.disabled = false;
        });
    }
}

function isGameFinished(players) {
    return areAllValuesSet() || hasPlayerWon(players);
}

function areAllValuesSet() {
    return elements('.board .field:not(:checked)').length === 0;
}

function hasPlayerWon(players) {
    return players.filter(function(player) {
        var values = playerValues(player);

        return (hasCompleteRow(values)
            || hasCompleteColumn(values)
            || hasCompleteDiagonal(values));
    }).length;
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
