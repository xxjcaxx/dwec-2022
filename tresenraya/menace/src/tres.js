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
  combineLatest
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

function clickCell(cell) {
  //console.log(cell);
  const currentState = stateSubject.getValue();
  // const { turn } = currentState;
  // const game = { ...currentState.game };
  /*  if (game[cell.id] === 0 && currentState === 1) {
      game[cell.id] = turn;
      stateSubject.next({ turn: switchTurn(turn), game });
      const winner = getWinner(game);
      if (winner !== 0) {
        showWinner(winner);
      }
    }*/
  setCell(currentState, cell.id.split("").at(-1), 1)
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
  // const clickSubscription = addEvents().subscribe(clickBoard);
  document.querySelector('#reset').addEventListener('click', reset);

  generateAdjusts().subscribe(printDivBoxes);

  const IASubscription = stateSubject.subscribe(IATurn);

  moveSubject.subscribe(printMove);


  const userClickObservable = addEvents().pipe(
    map(e => e.target.id.split('').at(-1)),
    map(t => { return { turn: 1, target: parseInt(t) } })
  );
  const menaceClickObservable = IAClick.pipe(
    map(t => { return { turn: 2, target: parseInt(t) } })
  );

  const playersClickObsevable = merge(userClickObservable, menaceClickObservable)
    .pipe(
      tap(a => console.log("CLICKCCCCCC", a))
    );

  const gameObservable = combineLatest([playersClickObsevable, stateSubject]).pipe(
    tap(a => console.log("gameeeee", a))
  );

  /*gameObservable.subscribe(([click, state]) => {
    setCell(state, click.target, click.turn);
    fillBoard(state.game);
    document.querySelector('#turno').innerHTML = translateCell(click.turn);
  })*/

  playersClickObsevable.subscribe(click => {
    const currentState = stateSubject.getValue();
    setCell(currentState,click.target,click.turn);
  } );









});
