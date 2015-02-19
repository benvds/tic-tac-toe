var util = require('./lib/util'),
    dom = require('./lib/dom');
    $ = require('./lib/dom').$;
    TicTacToe = require('./tictactoe');

document.addEventListener('DOMContentLoaded', function documentLoaded() {
    var UI = {
            BOARD: $('.board')[0],
            FIELDS: $('.field'),
            STATE: $('.state')[0],
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
        row: dom.elementIndex(parentTableData),
        column: dom.elementIndex(parentTableRow)
    };
}

function updateUI(UI, state) {
    // TODO retrieve stateName (won/draw/playing) and handle with gameStateHandlers
    if (TicTacToe.winner(state)) {
        UI.STATE.innerHTML = 'winner: ' + TicTacToe.winner(state);
        disableFields(UI.FIELDS);
    } else if (TicTacToe.isDraw(state)) {
        UI.STATE.innerHTML = 'draw';
        disableFields(UI.FIELDS);
    } else {
        UI.STATE.innerHTML = 'Turn: ' + TicTacToe.currentPlayer(state);
    }
}

function disableFields(fields) {
    fields.forEach(function(field) {
        field.disabled = true;
    });
}
