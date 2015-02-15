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
    var game = {
            players: ['red', 'blue'],
            currentPlayerIndex = 0
        },
        ui: {
            turn: elements('.turn')[0],
            fields: elements('.board .field'),
            resetButton: elements('.reset')[0],
            result: elements('.result')[0]
        };

    ui.fields.forEach(function(field) {
        field.addEventListener('change', function() {
            handleFieldChange(game, ui, field)
        });
    });

    resetButton.addEventListener('click', function() {
        uncheckFields(fields, result);
        checkGameState(game, ui);
    });

    checkGameState(game, ui);
});

function handleFieldChange(game, ui, field) {
    if (field.checked) {
        field.value = currentPlayer(game);
        field.disabled = true;
        field.parentElement.bgColor = currentPlayer(game);
        game.currentPlayerIndex = nextPlayerIndex(game);
    } else {
        field.value = '';
        field.disabled = false;
        field.parentElement.bgColor = 'white';
    }

    checkGameState(game, ui);
}

function currentPlayer(game) {
    return game.players[game.currentPlayerIndex];
}

function nextPlayerIndex(game) {
    return ((game.players.length - 1) > game.currentPlayerIndex) ?
        game.currentPlayerIndex + 1 : 0;
}

function checkGameState(game, ui) {
    var winner = hasPlayerWon(game.players);

    if (winner) {
        ui.result.innerHTML = 'winner: ' + winner;
        ui.turn.innerHTML = '';
        disableFields(ui.fields);
    } else if (areAllValuesSet()) {
        ui.result.innerHTML = 'draw';
        ui.turn.innerHTML = '';
        disableFields(ui.fields);
    } else {
        ui.turn.innerHTML = currentPlayer(game);
    }
}

function disableFields(fields) {
    fields.forEach(function(field) {
        field.disabled = true;
    });
}

function uncheckFields(fields, result) {
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
