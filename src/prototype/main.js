(function(window, util, dom, $, TicTacToe) {
    document.addEventListener('DOMContentLoaded', initBoard);

    function initBoard() {
        var ui = {
                BOARD: $('.board')[0],
                FIELDS: $('.field'),
                STATE: $('.state')[0],
                RESET_BUTTON: $('.reset')[0],
                fieldEvents: [] // allows for removal of events
            },
            state = new TicTacToe();

        initFields(ui, state);
        initResetButton(ui);
        updateUI(ui, state);
    }

    function initFields(ui, state) {
        ui.FIELDS.forEach(function(field) {
            function handleFieldClick() {
                claimField(state, field);
                removeClickEventHandler(ui.fieldEvents, field);
                updateUI(ui, state);
            };

            field.style.backgroundColor = '';
            field.addEventListener('click', handleFieldClick);
            ui.fieldEvents.push({ element: field, eventHandler: handleFieldClick });
        });
    }

    function initResetButton(ui) {
        function handleResetClick() {
            removeFieldEvents(ui);
            ui.RESET_BUTTON.removeEventListener('click', handleResetClick);
            initBoard();
        }

        ui.RESET_BUTTON.addEventListener('click', handleResetClick);
    }

    function claimField(state, field) {
        field.style.backgroundColor = state.currentPlayer(state);

        return state.claimPosition(inputFieldPosition(field));
    }

    function removeFieldEvents(ui) {
        ui.FIELDS.forEach(function(field) {
            removeClickEventHandler(ui.fieldEvents, field);
        });
    }

    function removeClickEventHandler(fieldEvents, field) {
        var fieldEvent = fieldEvents.filter(function(fieldEvent) {
            return fieldEvent.element === field;
        })[0];

        if (fieldEvent) {
            field.removeEventListener('click', fieldEvent.eventHandler);
        }
    }

    function inputFieldPosition(field) {
        return {
            row: dom.elementIndex(field.parentElement),
            column: dom.elementIndex(field)
        };
    }

    var UI_UPDATE_HANDLERS = {
        'PLAYING': function UiUpdatePlaying(ui, state) {
            ui.STATE.innerHTML = 'Turn: ' + state.currentPlayer();
        },
        'WON': function UiUpdateWon(ui, state) {
            ui.STATE.innerHTML = 'Winner: ' + state.winner();
            removeFieldEvents(ui);
        },
        'DRAW': function UiUpdateDraw(ui, state) {
            ui.STATE.innerHTML = 'Draw';
            removeFieldEvents(ui);
        }
    };

    function updateUI(ui, state) {
        var stateHandler = UI_UPDATE_HANDLERS[state.gameState()];
        stateHandler.call(null, ui, state);
    }
})(window, window.util, window.dom, window.dom.$, window.TicTacToe);
