"use strict";


/////////// Funciones de relleno del tablero y eventos
// Para trabajar con 0,1,2, debemos luego traducir lo que se muestra
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
  function clickBoard(event){
    clickCell(event.target,state);
    fillBoard(board,state.getGame());
  }

  board.addEventListener('click',clickBoard);
}
function clickCell(cell,state){
  const turn = state.getTurn();
  const game = state.getGame();
  game[cell.id] = turn;
  state.setGame(game);
  state.getWinner();
  state.switchTurn();
}


//////////// Estado del juego 
/// Se pone en una función para mantener las closures y controlar su mutación
function gameState(){  // Estado del juego en turnos
  let turn = 1;  // closure para proteger el turno
  // ignore-prettier
  let game = {
    pos1: 0, pos2: 0, pos3: 0,
    pos4: 0, pos5: 0, pos6: 0,
    pos7: 0, pos8: 0, pos9: 0,
  }
  return {
    getTurn() { return turn;},
    setTurn(t) {turn = t;},
    switchTurn() { console.log(turn); turn == 1 ? turn = 2 : turn = 1; },
    getGame() { return {...game}; },
    setGame(g) { game = g; },
    getWinner() { 
      const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[6,4,2],[0,3,6],[1,4,7],[2,5,8]];
      function getPos(combo){
        return [ Object.values(game)[combo[0]], Object.values(game)[combo[1]], Object.values(game)[combo[2]] ];
      }
      
      if (winCombos.some(combo => getPos(combo).every( v=> v===1) ))  // Algunos combos dan todos iguales a 1
      {
        console.log('1 winner');
      }
      if (winCombos.some(combo => getPos(combo).every( v=> v===2) ))
      {
        console.log('2 winner');
      }
      
    }
  };
}

function reset(){
  const board = document.querySelector("#boardTable");
  const state = gameState();
  fillBoard(board, state.getGame());
  //addEvents(board,state);
  return state;
}


//////// Inicio del juego
document.addEventListener("DOMContentLoaded", function initialLoad() {
  // Se hace con declaración de función para rastrear mejor
  //const state = reset();
  addEvents( document.querySelector("#boardTable"),reset());
  document.querySelector('#reset').addEventListener('click',reset);
});
