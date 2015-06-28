(function(window, util, dom, $, matrix) {

    document.addEventListener('DOMContentLoaded', function documentLoaded() {
        var game = {
            players: ['red', 'blue'],
            currentPlayerIndex: 0
        };
        var ui = {
            // turn: $('.turn')[0],
            fields: $('.field'),
            resetButton: $('.reset')[0],
            state: $('.state')[0]
        };

        ui.fields.forEach(function(field) {
            field.addEventListener('change', function() {
                handleFieldChange(game, ui, field);
            });
        });

        ui.resetButton.addEventListener('click', function() {
            uncheckFields(ui.fields, ui.state);
            checkGameState(game, ui);
        });

        checkGameState(game, ui);
    });

    function handleFieldChange(game, ui, field) {
        if (field.checked) {
            field.value = currentPlayer(game);
            field.disabled = true;
            field.parentElement.style.backgroundColor = currentPlayer(game);
            game.currentPlayerIndex = nextPlayerIndex(game);
        } else {
            field.value = '';
            field.disabled = false;
            field.parentElement.style.backgroundColor = 'white';
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
            ui.state.innerHTML = 'winner: ' + winner;
            // ui.turn.innerHTML = '';
            disableFields(ui.fields);
        } else if (areAllValuesSet()) {
            ui.state.innerHTML = 'draw';
            // ui.turn.innerHTML = '';
            disableFields(ui.fields);
        } else {
            ui.state.innerHTML = currentPlayer(game);
        }
    }

    function disableFields(fields) {
        fields.forEach(function(field) {
            field.disabled = true;
        });
    }

    function uncheckFields(fields) {
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
        return $('.board .field:not(:checked)').length === 0;
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
        return $('.row').map(function(row) {
            return rowValues(row, player);
        });
    }

    // returns array of values from table row
    function rowValues(row, player) {
        return $('.field', row).map(function(field) {
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
        return hasCompleteRow(matrix.transpose(values));
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

})(window, window.util, window.dom, window.dom.$, window.matrix);
