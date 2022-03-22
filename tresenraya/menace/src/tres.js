"use strict";

import './styles.css'
//import './tests'
import { getPartida, setPartida } from './conexiones'

import { BehaviorSubject, count, from, fromEvent, interval, mergeMap, of, Subject } from "rxjs";


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
function addEvents() {
  let board = document.querySelector("#boardTable");
  const clickObservable = fromEvent(board, 'click');
  return clickObservable;
}
function clickBoard(event) {
  clickCell(event.target);
}

function clickCell(cell) {
  const currentState = stateSubject.getValue();
  const turn = currentState.turn;
  const game = { ...currentState.game };
  if (game[cell.id] == 0) {
    game[cell.id] = turn;
    stateSubject.next(
      { turn: switchTurn(turn), game }
    )
    const winner = getWinner(game);
    if (winner != 0) {
      showWinner(winner);
    }
    setPartida(stateSubject.getValue());
  }


}

function showWinner(winner) {
  document.querySelector('#winner').innerHTML = translateCell(winner);
}

//////////// Estado del juego
/// Utilizaremos un Subject para mantener el estado
// prettier-ignore
const gameInitial = { pos1: 0, pos2: 0, pos3: 0, pos4: 0, pos5: 0, pos6: 0, pos7: 0, pos8: 0, pos9: 0, };

const stateSubject = new BehaviorSubject({
  turn: 1,
  // prettier-ignore
  game: { ...gameInitial }
});


function switchTurn(turn) {
  turn == 1 ? (turn = 2) : (turn = 1);
  return turn
}

function getWinner(game) {
  // prettier-ignore
  const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
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
}


function reset(state) {
  stateSubject.next({ turn: 1, game: { ...gameInitial } });
  setPartida(stateSubject.getValue());
}

//////// Inicio del juego
document.addEventListener("DOMContentLoaded", function initialLoad() {
  // Se hace con declaración de función para rastrear mejor
  const stateSubscription = stateSubject.subscribe(state => {
    fillBoard(state.game);
    document.querySelector('#turno').innerHTML = translateCell(state.turn);
  });
  const clickSubscription = addEvents().subscribe(clickBoard);
  document
    .querySelector("#reset")
    .addEventListener("click", reset);



  interval(1000)   // Cada segundo
    .pipe(          // aplica un pipe al observable de cada segundo
      mergeMap(     // de manera que invoque a la creación de un observable con el que se mezclará
        () => from(getPartida())))  // El resultado del primero no importa, pero creamos un observable de la promesa getPartida
    .subscribe(p =>  // finalmente nos subscribimos al observable resultante para poner la partida actual. 
      stateSubject.next(p)
    );

});



//////////////////// Funciones para los ajustes del menace


   // prettier-ignore
   const rotations=[
    [0,1,2,3,4,5,6,7,8],
    [0,3,6,1,4,7,2,5,8],
    [6,3,0,7,4,1,8,5,2],
    [6,7,8,3,4,5,0,1,2],
    [8,7,6,5,4,3,2,1,0],
    [8,5,2,7,4,1,6,3,0],
    [2,5,8,1,4,7,0,3,6],
    [2,1,0,5,4,3,8,7,6]
    ]
  
function applyRotations(array){
  return rotations.map(R=> R.map(r=> array[r]))
}

function contar(array,n){
 return array.reduce((a,b)=> b == n ?  a+1 :  a ,0)
}

function sameQuantity(array){  //retorna si un array tiene los mismos 1 que 2
  return contar(array,1) == contar(array,2);
}

function areEquals(array1,array2){
  return array1.every((val,index)=> val === array2[index]);
}

function allGames() {
  // prettier-ignore
  // [0, 0, 0, 0, 0, 0, 0, 0, 0]
  const numbers = [0,1,2]
  let all = [];

  function addNumber(array,n) {  // Funcion recursiva para hacer todas las combinaciones posibles
    const newArray = [...array,n];
    if(newArray.length == 9) { 
      if(sameQuantity(newArray) && contar(newArray,1) < 4  && contar(newArray,1) > 0){  
        // solo interesan las que tienen al menos una jugada y menos de 4 y tienen los mismos 1 que 2
        all.push(newArray); 
     }
    }
    else {
      for(let nn of numbers){
        addNumber(newArray,nn);  // Si no está completo la vuelve invocar
      }
    }

  }
  numbers.forEach(n=>addNumber([],n));
  console.log(all);

  // Ahora tenemos todas la posibles partidas a falta de una jugada, pero hay muchas partidas realmente iguales, ya que hay rotaciones

  let uniq = [];
  let allCopy = [...all];

  for (let partida of all){

    uniq.push(partida);
    const rotations = applyRotations(partida);
    rotations.forEach(R=>{
      let index = all.findIndex(p => areEquals(R,p));
      allCopy[index] = null; /// falla
    });


   // const equals = all.filter(p => applyRotations(partida).some(R => areEquals(R,p)) )
   // console.log(equals);
  }

  console.log(uniq,allCopy);


}

allGames();

function generateAdjusts() {

} 