var _ = require('lodash'),
    TicTacToe = require('./tictactoe');

var indexOf = Array.prototype.indexOf,
    slice = Array.prototype.slice;

function toArray(subject) {
    return slice.call(subject);
}

function elements(selectors, subject) {
    return toArray((subject || document).querySelectorAll(selectors));
}

document.addEventListener('DOMContentLoaded', function documentLoaded() {
    var UI = {
            BOARD: elements('.board')[0],
            FIELDS: elements('.field'),
            TURN: elements('.turn')[0],
            RESET_BUTTON: elements('.reset')[0],
            RESULT: elements('.result')[0]
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
        row: elementIndex(parentTableData),
        column: elementIndex(parentTableRow)
    };
}

function elementIndex(element) {
    return indexOf.call(element.parentElement.children, element);
}

function updateUI(UI, state) {
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
    }
}

function disableFields(fields) {
    fields.forEach(function(field) {
        field.disabled = true;
    });
}
