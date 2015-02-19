var util = require('./lib/util'),
    dom = require('./lib/dom');
    $ = require('./lib/dom').$;
    TicTacToe = require('./tictactoe');

document.addEventListener('DOMContentLoaded', function documentLoaded() {
    var UI = {
            BOARD: $('.board')[0],
            FIELDS: $('.field'),
            STATE: $('.state')[0],
            RESET_BUTTON: $('.reset')[0]
        },
        state = TicTacToe.newState();

    UI.FIELDS.forEach(function(field) {
        field.addEventListener('click', function() {
            if (field.style.backgroundColor === '') {
                state = claimField(state, field);
                updateUI(UI, state);
            }
        });
    });

    UI.RESET_BUTTON.addEventListener('click', function() {
        UI.FIELDS.forEach(function(field) {
            field.style.backgroundColor = '';
        });
        state = TicTacToe.newState();
        updateUI(UI, state);
    });

    updateUI(UI, state);
});

function claimField(state, field) {
    field.style.backgroundColor = TicTacToe.currentPlayer(state);

    return TicTacToe.claimPosition(state, inputFieldPosition(field));
}

// returns input field position in table: [x, y]
function inputFieldPosition(field) {
    return {
        row: dom.elementIndex(field.parentElement),
        column: dom.elementIndex(field)
    };
}

function updateUI(UI, state) {
    // TODO retrieve stateName (won/draw/playing) and handle with gameStateHandlers
    if (TicTacToe.winner(state)) {
        UI.STATE.innerHTML = 'winner: ' + TicTacToe.winner(state);
    } else if (TicTacToe.isDraw(state)) {
        UI.STATE.innerHTML = 'draw';
    } else {
        UI.STATE.innerHTML = 'Turn: ' + TicTacToe.currentPlayer(state);
    }
}
