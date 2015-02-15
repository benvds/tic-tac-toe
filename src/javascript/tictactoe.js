var _ = require('lodash');

// transposes a matrix (swaps rows and columns)
function transpose(matrix) {
    return matrix.map(function(row, index, matrix) {
        return matrix.map(function(row) {
            return row[index];
        });
    });
}

function isDraw(state) {
    return _.every(_.flatten(state.values), function(item) {
        return !_.isNull(item);
    });
}

function winner(state) {
    return state.players.filter(function(player) {
        var values = mapToBoolean(state.values, player);

        return (containsAllTrue(values)
            || hasCompleteColumn(values)
            || hasCompleteDiagonal(values));
    })[0];
}

function mapToBoolean(matrix, value) {
    return matrix.map(function(row) {
        return row.map(function(item) {
            return (item === value);
        });
    });
}

function containsAllTrue(matrix) {
    return _.some(matrix, function(row) {
        return !_.contains(row, false);
    });
}

function hasCompleteColumn(values) {
    return containsAllTrue(transpose(values));
}

function hasCompleteDiagonal(values) {
    return containsAllTrue([diagonalValuesDescending(values),
                          diagonalValuesAscending(values)]);
}

function diagonalValuesDescending(matrix) {
    return matrix.map(function(row, index) {
        return row[index];
    });
}

function diagonalValuesAscending(matrix) {
    return matrix.map(function(row, index) {
        return row[(matrix.length - 1) - index];
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
    var newState = _.clone(state, true);

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
