(function(window, util, matrix) {
    var TicTacToe = window.TicTacToe = function() {
        this.players = ['red', 'blue'];
        this.currentPlayerIndex = 0;
        this.values = [[null, null, null],
            [null, null, null],
            [null, null, null]];
    };

    TicTacToe.prototype.gameState = function() {
        if (this.winner()) {
            return 'WON';
        } else if (this.isDraw()) {
            return 'DRAW';
        } else {
            return 'PLAYING';
        }
    };

    TicTacToe.prototype.winner = function() {
        return this.players.filter(function(player) {
            var playerPositions = this.mapToBoolean(this.values, player);

            return (this.hasCompleteRow(playerPositions)
                || this.hasCompleteColumn(playerPositions)
                || this.hasCompleteDiagonal(playerPositions));
        }.bind(this))[0];
    };

    TicTacToe.prototype.currentPlayer = function() {
        return this.players[this.currentPlayerIndex];
    };

    TicTacToe.prototype.claimPosition = function(position) {
        this.values[position.row][position.column] = this.currentPlayer();
        this.currentPlayerIndex = this.nextPlayerIndex();

        return this;
    };

    TicTacToe.prototype.isDraw = function() {
        return util.every(util.flatMap(this.values), function(item) {
            return item !== null;
        });
    };

    TicTacToe.prototype.mapToBoolean = function(collection, value) {
        return matrix.mapItems(collection, function(item) {
            return (item === value);
        });
    };

    TicTacToe.prototype.hasCompleteRow = function(collection) {
        return collection.some(function(row) {
            return util.every(row, function(item) {
                return item === true;
            });
        });
    };

    TicTacToe.prototype.hasCompleteColumn = function(values) {
        return this.hasCompleteRow(matrix.transpose(values));
    };

    TicTacToe.prototype.hasCompleteDiagonal = function(values) {
        return this.hasCompleteRow([this.diagonalValuesDescending(values),
                              this.diagonalValuesAscending(values)]);
    };

    TicTacToe.prototype.diagonalValuesDescending = function(collection) {
        return collection.map(function(row, index) {
            return row[index];
        });
    };

    TicTacToe.prototype.diagonalValuesAscending = function(collection) {
        return collection.map(function(row, index) {
            return row[(collection.length - 1) - index];
        });
    };

    TicTacToe.prototype.nextPlayerIndex = function() {
        return ((this.players.length - 1) > this.currentPlayerIndex) ?
            this.currentPlayerIndex + 1 : 0;
    };
})(window, window.util, window.matrix);
