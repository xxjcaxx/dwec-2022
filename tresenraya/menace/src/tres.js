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
  map,
  merge,
  tap,
  zip,
  combineLatest,
  withLatestFrom,
  skip,
  filter
} from 'rxjs';
import {
  generateAdjusts,
  IATurn,
  printDivBoxes,
  moveSubject,
  printMove,
  IAClick
} from './menace';
import {
  getWinner,
  winCombos,
  getPos,
  reset,
  stateSubject,
  switchTurn,
  setCell
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
  // console.log("DATAAAAAAAAAAAAAAA",data);
  const board = document.querySelector('#boardTable');
  data.forEach((d, i) => {
    //  console.log(`#pos${i}`); 
    fillCell(d, board.querySelector(`#pos${i}`));
  });
}
function addEvents() {
  const board = document.querySelector('#boardTable');
  const clickObservable = fromEvent(board, 'click');
  return clickObservable;
}

function showWinner(winner) {
  document.querySelector('#winner').innerHTML = translateCell(winner);
}




/// ///// Inicio del juego
document.addEventListener('DOMContentLoaded', () => {

  // Ara cal crear totes les subscripcions
  // Botó de reset
  document.querySelector('#reset').addEventListener('click', reset);
  // Generar ajustos de Menace i subscripcio a la funció de pintar els ajustos
  generateAdjusts().subscribe(printDivBoxes);
  /// Quan es produeix un moviment, es dibuixa la memòria del menace
  moveSubject.subscribe(printMove);

  ///////////// Capturar els moviments dels players, en el cas de l'humà és un clik 
  /// En el cas de la màquina és la IA la que provoca el click
  const userClickObservable = addEvents().pipe(
    map(e => e.target.id.split('').at(-1)),
    map(t => { return { turn: 1, target: parseInt(t) } })
  );
  const menaceClickObservable = IAClick.pipe(
    map(t => { return { turn: 2, target: parseInt(t) } })
  );
  const playersClickObservable = merge(userClickObservable, menaceClickObservable)
    .pipe(
      tap(a => console.log("CLICKCCCCCC", a))
    );
   /// Per als clicks canviem l'estat 
  playersClickObservable
    .pipe(withLatestFrom(stateSubject))
    .subscribe(([click, state]) => {
      console.log("Game & Click", click, state);
      stateSubject.next(setCell(state, click.target, click.turn));
    })
    /// LA IA es suscriu a l'estat quan li toca i emet un click
  const IASubscription = stateSubject.pipe(filter(state => state.turn === 2)).subscribe(IATurn);
  // L'interficie es subscriu a l'estat també.
  const stateSubscription = stateSubject.subscribe((state) => {
    fillBoard(state.game);
    document.querySelector('#turno').innerHTML = translateCell(state.turn);
  });

});
