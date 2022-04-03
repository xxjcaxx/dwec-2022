
export {getWinner, winCombos, getPos, reset, stateSubject, switchTurn}



import {
    BehaviorSubject,
    count,
    from,
    fromEvent,
    interval,
    mergeMap,
    of,
    Subject,
  } from "rxjs";
//////////// Estado del juego
/// Utilizaremos un Subject para mantener el estado
// prettier-ignore
const gameInitial = { pos1: 0, pos2: 0, pos3: 0, pos4: 0, pos5: 0, pos6: 0, pos7: 0, pos8: 0, pos9: 0, };

const stateSubject = new BehaviorSubject({
  turn: 1,
  // prettier-ignore
  game: { ...gameInitial },
});

function switchTurn(turn) {
  turn == 1 ? (turn = 2) : (turn = 1);
  return turn;
}
// prettier-ignore
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
function getPos(combo, game) {
  // prettier-ignore
  return [Object.values(game)[combo[0]], Object.values(game)[combo[1]], Object.values(game)[combo[2]],
  ];
}

function getWinner(game) {
  // prettier-ignore

  let winner = 0;
  if (winCombos.some((combo) => getPos(combo, game).every((v) => v === 1))) {
    winner = 1;
  }
  if (winCombos.some((combo) => getPos(combo, game).every((v) => v === 2))) {
    winner = 2;
  }
  return winner;
}

function reset(state) {
  stateSubject.next({ turn: 1, game: { ...gameInitial } });
}