"use strict";

function translateCell(value){
  const translations = ["",'◯','×'];
  return translations[value];
}

function fillCell(value,cell){
 cell.innerHTML = translateCell(value);
}

function fillBoard(board, data) {
  Object.entries(data).forEach(position => fillCell(position[1], board.querySelector(`#${position[0]}`)));
}

function addEvents(board,state){
  board.addEventListener('click',function clickBoard(event){
    clickCell(event.target,state);
  });
}

function clickCell(cell,state){
  const turn = state.getTurn();
  fillCell(turn,cell);
  state.switchTurn()
}

function gameState(){  // Estado del juego en turnos
  let turn = 1;  // closure para proteger el turno
  return {
    getTurn() { return turn;},
    setTurn(t) {turn = t;},
    switchTurn() { turn == 1 ? turn = 2 : turn = 1; }
  };
}

document.addEventListener("DOMContentLoaded", function initialLoad() {
  // Se hace con declaración de función para rastrear mejor
  const board = document.querySelector("#boardTable");
  fillBoard(board, {
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0,
    pos5: 1,
    pos6: 2,
    pos7: 0,
    pos8: 0,
    pos9: 0,
  });
  const state = gameState();
  addEvents(board,state);
});
