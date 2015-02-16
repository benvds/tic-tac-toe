var util = require('./lib/util'),
    $ = require('./lib/util').$;
    TicTacToe = require('./tictactoe');

document.addEventListener('DOMContentLoaded', function documentLoaded() {
    var UI = {
            BOARD: $('.board')[0],
            FIELDS: $('.field'),
            TURN: $('.turn')[0],
            RESET_BUTTON: $('.reset')[0],
            RESULT: $('.result')[0]
        },
        state = TicTacToe.newState();

    UI.FIELDS.forEach(function(field) {
        field.addEventListener('change', function() {
            state = claimField(state, field);
            updateUI(UI, state);
        });
    });

    UI.RESET_BUTTON.addEventListener('click', function() {
        UI.FIELDS.forEach(function(field) {
            field.checked = false;
            field.disabled = false;
            field.parentElement.bgColor = 'white';
        });
        state = TicTacToe.newState();
        updateUI(UI, state);
    });

    updateUI(UI, state);
});

function claimField(state, field) {
    field.disabled = true;
    field.parentElement.bgColor = TicTacToe.currentPlayer(state);

    return TicTacToe.claimPosition(state, inputFieldPosition(field));
}

// returns input field position in table: [x, y]
function inputFieldPosition(field) {
    var parentTableData = field.parentElement,
        parentTableRow = parentTableData.parentElement;

    return {
        row: util.elementIndex(parentTableData),
        column: util.elementIndex(parentTableRow)
    };
}

function updateUI(UI, state) {
    // TODO retrieve stateName (won/draw/playing) and handle with functions
    if (TicTacToe.winner(state)) {
        UI.RESULT.innerHTML = 'winner: ' + TicTacToe.winner(state);
        UI.TURN.innerHTML = '';
        disableFields(UI.FIELDS);
    } else if (TicTacToe.isDraw(state)) {
        UI.RESULT.innerHTML = 'draw';
        UI.TURN.innerHTML = '';
        disableFields(UI.FIELDS);
    } else {
        UI.TURN.innerHTML = TicTacToe.currentPlayer(state);
        UI.RESULT.innerHTML = '';
    }
}

function disableFields(fields) {
    fields.forEach(function(field) {
        field.disabled = true;
    });
}
