var util = require('./lib/util'),
    dom = require('./lib/dom');
    $ = require('./lib/dom').$;
    TicTacToe = require('./tictactoe');


var UI_UPDATE_HANDLERS = {
    'PLAYING': function UiUpdatePlaying(UI, state) {
        UI.STATE.innerHTML = 'Turn: ' + TicTacToe.currentPlayer(state);
    },
    'WON': function UiUpdateWon(UI, state) {
        UI.STATE.innerHTML = 'Winner: ' + TicTacToe.winner(state);
    },
    'DRAW': function UiUpdateDraw(UI, state) {
        UI.STATE.innerHTML = 'Draw';
    }
};

// TODO
//  - extract board initialization
//  - use that on reset
//  - remove event handlers when field is claimed
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

function inputFieldPosition(field) {
    return {
        row: dom.elementIndex(field.parentElement),
        column: dom.elementIndex(field)
    };
}

function updateUI(UI, state) {
    var stateHandler = UI_UPDATE_HANDLERS[TicTacToe.stateName(state)];
    stateHandler.call(null, UI, state);
}
