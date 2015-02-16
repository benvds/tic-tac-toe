var util = require('./lib/util'),
    matrix = require('./lib/matrix');

function isDraw(state) {
    return util.every(matrix.flatten(state.values), function(item) {
        return item !== null;
    });
}

function winner(state) {
    return state.players.filter(function(player) {
        var values = mapToBoolean(state.values, player);

        return (hasCompleteRow(values)
            || hasCompleteColumn(values)
            || hasCompleteDiagonal(values));
    })[0];
}

function mapToBoolean(collection, value) {
    return matrix.mapItems(collection, function(item) {
        return (item === value);
    });
}

function hasCompleteRow(collection) {
    return collection.some(function(row) {
        return util.every(row, function(item) {
            return item === true;
        });
    });
}

function hasCompleteColumn(values) {
    return hasCompleteRow(matrix.transpose(values));
}

function hasCompleteDiagonal(values) {
    return hasCompleteRow([diagonalValuesDescending(values),
                          diagonalValuesAscending(values)]);
}

function diagonalValuesDescending(collection) {
    return collection.map(function(row, index) {
        return row[index];
    });
}

function diagonalValuesAscending(collection) {
    return collection.map(function(row, index) {
        return row[(collection.length - 1) - index];
    });
}

function currentPlayer(state) {
    return state.players[state.currentPlayerIndex];
}

function nextPlayerIndex(state) {
    return ((state.players.length - 1) > state.currentPlayerIndex) ?
        state.currentPlayerIndex + 1 : 0;
}

function claimPosition(state, position) {
    var newState = util.clone(state, true);

    newState.values[position.row][position.column] = currentPlayer(state);
    newState.currentPlayerIndex = nextPlayerIndex(state);

    return newState;
}

var TicTacToe = {
    newState: function() {
        return {
            players: ['red', 'blue'],
            currentPlayerIndex: 0,
            values: [[null, null, null],
                [null, null, null],
                [null, null, null]]
        };
    },
    winner: winner,
    isDraw: isDraw,
    currentPlayer: currentPlayer,
    claimPosition: claimPosition
};

module.exports = TicTacToe;
