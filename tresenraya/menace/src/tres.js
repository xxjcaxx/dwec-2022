import './styles.css';
 import "./tests";
// import { getPartida, setPartida } from "./conexiones";
import {
  BehaviorSubject,
  count,
  from,
  fromEvent,
  interval,
  mergeMap,
  of,
  Subject,
} from 'rxjs';
import {
  generateAdjusts,
  IATurn,
  printDivBoxes,
  moveSubject,
  printMove,
} from './menace';
import {
  getWinner,
  winCombos,
  getPos,
  reset,
  stateSubject,
  switchTurn,
} from './game';

/// //////// Funciones de relleno del tablero y eventos
// Para trabajar con 0,1,2, debemos luego traducir lo que se muestra
function translateCell(value) {
  const translations = ['', '◯', '×'];
  return translations[value];
}
function fillCell(value, cell) {
  cell.innerHTML = translateCell(value);
}
function fillBoard(data) {
  const board = document.querySelector('#boardTable');

  Object.entries(data).forEach((position) => fillCell(position[1], board.querySelector(`#${position[0]}`)));
}
function addEvents() {
  const board = document.querySelector('#boardTable');
  const clickObservable = fromEvent(board, 'click');
  return clickObservable;
}

function showWinner(winner) {
  document.querySelector('#winner').innerHTML = translateCell(winner);
}

function clickCell(cell) {
  const currentState = stateSubject.getValue();
  const { turn } = currentState;
  const game = { ...currentState.game };
  if (game[cell.id] === 0 && turn === 1) {
    game[cell.id] = turn;
    stateSubject.next({ turn: switchTurn(turn), game });
    const winner = getWinner(game);
    if (winner !== 0) {
      showWinner(winner);
    }
  }
}

function clickBoard(event) {
  clickCell(event.target);
}



/// ///// Inicio del juego
document.addEventListener('DOMContentLoaded', () => {
  // Se hace con declaración de función para rastrear mejor
  const stateSubscription = stateSubject.subscribe((state) => {
    fillBoard(state.game);
    document.querySelector('#turno').innerHTML = translateCell(state.turn);
  });
  const clickSubscription = addEvents().subscribe(clickBoard);
  document.querySelector('#reset').addEventListener('click', reset);

  generateAdjusts().subscribe(printDivBoxes);

  const IASubscription = stateSubject.subscribe(IATurn);

  moveSubject.subscribe(printMove);
});
