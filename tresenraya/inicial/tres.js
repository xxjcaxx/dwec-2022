"use strict";

/////////// Funciones de relleno del tablero y eventos
// Para trabajar con 0,1,2, debemos luego traducir lo que se muestra
function translateCell(value) {
  const translations = ["", "◯", "×"];
  return translations[value];
}
function fillCell(value, cell) {
  cell.innerHTML = translateCell(value);
}
function fillBoard(data) {
  const board = document.querySelector("#boardTable");
  Object.entries(data).forEach((position) =>
    fillCell(position[1], board.querySelector(`#${position[0]}`))
  );
}
function addEvents(state) {
  let board = document.querySelector("#boardTable");
  function clickBoard(event) {
    clickCell(event.target, state);
    fillBoard(state.getGame());
  }
  board.addEventListener("click", clickBoard);
}

function clickCell(cell, state) {
  const turn = state.getTurn();
  const game = state.getGame();
  game[cell.id] = turn;
  state.setGame(game);
  const winner = state.getWinner();
  if (winner != 0) {
    showWinner(winner);
  }
  state.switchTurn();
}

function showWinner(winner) {
  document.querySelector("#winner").innerHTML = winner;
}

//////////// Estado del juego
/// Se pone en una función para mantener las closures y controlar su mutación
function gameState() {
  // Estado del juego en turnos
  let turn = 1; // closure para proteger el turno
  // prettier-ignore
  let game = { pos1: 0, pos2: 0, pos3: 0, pos4: 0, pos5: 0, pos6: 0, pos7: 0, pos8: 0, pos9: 0,};
  return {
    getTurn() {
      return turn;
    },
    setTurn(t) {
      turn = t;
    },
    switchTurn() {
      turn == 1 ? (turn = 2) : (turn = 1);
    },
    getGame() {
      return { ...game };
    },
    setGame(g) {
      game = { ...g };
    },
    getWinner() {
      // prettier-ignore
      const winCombos = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 4, 8],[6, 4, 2],[0, 3, 6],[1, 4, 7],[2, 5, 8]];
      function getPos(combo) {
        // prettier-ignore
        return [Object.values(game)[combo[0]], Object.values(game)[combo[1]], Object.values(game)[combo[2]],
        ];
      }
      let winner = 0;
      if (winCombos.some((combo) => getPos(combo).every((v) => v === 1))) {
        winner = 1;
      }
      if (winCombos.some((combo) => getPos(combo).every((v) => v === 2))) {
        winner = 2;
      }
      return winner;
    },
    reset() {
      game = {
        pos1: 0,
        pos2: 0,
        pos3: 0,
        pos4: 0,
        pos5: 0,
        pos6: 0,
        pos7: 0,
        pos8: 0,
        pos9: 0,
      };
    },
  };
}

function reset(state) {
  state.reset();
  fillBoard(state.getGame());
  return state;
}

//////// Inicio del juego
document.addEventListener("DOMContentLoaded", function initialLoad() {
  // Se hace con declaración de función para rastrear mejor
  const state = gameState();
  fillBoard(state.getGame());
  addEvents(state);
  document
    .querySelector("#reset")
    .addEventListener("click", () => reset(state));
});
