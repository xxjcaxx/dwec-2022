
export { generateAdjusts, IATurn, printDivBoxes, moveSubject, printMove, IAClick, informWinner,resetMenace };
import { BehaviorSubject, Subject } from 'rxjs';
import { getWinner, winCombos, getPos, reset, stateSubject, switchTurn } from './game'

// prettier-ignore
const rotations = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8],   // 0 Normal
  [0, 3, 6, 1, 4, 7, 2, 5, 8],   // 1 filas <--> columnas
  [6, 3, 0, 7, 4, 1, 8, 5, 2],   // 2 rotacion 90 
  [6, 7, 8, 3, 4, 5, 0, 1, 2],   // Espejo horizontal
  [8, 7, 6, 5, 4, 3, 2, 1, 0],   // Espejo horizontal y luego vertical
  [8, 5, 2, 7, 4, 1, 6, 3, 0],   // rotacion -90 y espejo vertical
  [2, 5, 8, 1, 4, 7, 0, 3, 6],   // rotacion -90
  [2, 1, 0, 5, 4, 3, 8, 7, 6]    // Espejo vertical
]


///// Rotacions a arrays
function applyRotations(array) {
  return rotations.map((R) => R.map((r) => array[r]));
}
///// Rotacions a posicions concretes
function applyRotationPosition(position, rotationIndex) {
  return rotations[rotationIndex][position];
}



function contar(array, n) {  // ocurrencias de un numero en un array
  return array.reduce((a, b) => (b == n ? a + 1 : a), 0);
}

function sameQuantity(array) {
  //retorna si un array tiene los mismos 1 que 2
  return contar(array, 1) == contar(array, 2);
}

function areEquals(array1, array2) {  // si dos arrays son iguales
  return array1.every((val, index) => val === array2[index]);
}

function thereAreEqual(allArrays, array) {  // hay alguno igual en cualquier rotacion
  return (
    applyRotations(array).filter((rotation) =>
      allArrays.find((a) => areEquals(a, rotation))
    ).length > 0
  );
}

function translateCellAdjust(value) { // si es un numero lo deja, si es O o X retorna el equivalente unicode
  if (isNaN(value)) {
    return { O: "◯", X: "×" }[value];
  }
  return value;
}

function translateBoxAdjust(arrayGame) {
  return arrayGame.map(translateCellAdjust);
}

function allGames() {

  const numbers = [0, 1, 2]; // numeros para hacer combinaciones
  let all = [];  // Array para ir guardando todos lo juegos

  function addNumber(array, n) {
    // Funcion recursiva para hacer todas las combinaciones posibles
    const newArray = [...array, n];
    if (newArray.length == 9) {
      if (
        sameQuantity(newArray) &&
        contar(newArray, 1) < 4 &&
        contar(newArray, 1) > 0 &&
        !thereAreEqual(all, newArray) &&
        !winCombos.some((combo) =>
          getPos(combo, newArray).every((v) => v === 1)
        ) &&
        !winCombos.some((combo) =>
          getPos(combo, newArray).every((v) => v === 2)
        )
      ) {
        // solo interesan las que tienen al menos una jugada y menos de 4 y tienen los mismos 1 que 2
        // Ahora puede ser que en array ya existan jugadas iguales pero con otra rotación.
        // Vamos a buscarlas y, si las encontramos, no insertamos
        // tampoco nos sirven jugadas ya ganadoras

        all.push(newArray);
      }
    } else {
      for (let nn of numbers) {
        addNumber(newArray, nn); // Si no está completo la vuelve invocar
      }
    }
  }

  numbers.forEach((n) => addNumber([], n));  // invoacion de la función recursiva


  console.log(all);
  console.log(
    "1 jugada",
    all.filter((p) => contar(p, 1) == 1)
  );
  console.log(
    "2 jugada",
    all.filter((p) => contar(p, 1) == 2)
  );
  console.log(
    "3 jugada",
    all.filter((p) => contar(p, 1) == 3)
  );

  /// Vamos a invertir todos los arrays para facilitar la lectura:
  all = all.map((p) => p.reverse());

  ///  A continuación hay que llenar todo el tablero con las bolas iniciales
  // Las partidas pueden tener varias rotaciones iguales. Si son simétricas hay que
  // descartar la simetria para que aprenda más rápido. eso se hace poniendo 0 bolas
  // En las partidas de 1 jugada se ponen 4 bolas en los sitios permitidos, de 2: 2 y de 3 una bola

  // Puesto que usaremos números para indicar las bolas, no podemos usarlos para  X O, así que vamos a traducir
  const allTranslated = all.map((p) => p.map((n) => [1, "◯", "×"][n]));

  // Para cada partida vamos a calcular la cantidad de simetrias que tiene
  /* const simetrias = allTranslated.map((p) =>
     applyRotations(p).reduce((a, b) => (areEquals(b, p) ? a + 1 : a), 0)
   );
   console.log("Simetrias", simetrias);
   const allSumadas = allTranslated.map((p) =>
     applyRotations(p).reduce((a, b) =>
       areEquals(b, p)
         ? a.map((n, index) => (isNaN(n) || isNaN(b[index]) ? n : n + b[index]))
         : a
     )
   );
   console.log('allSumadas',allSumadas);*/
  // Segun la rotacion que queda igual hay que aplicar los 0 en un sitio concreto. Hay que estudiar todas

  function ponerCeros(array, arrayCeros) {   // Aplica una máscara de 0
    return array.map((n, i) => arrayCeros[i] === 0 && n === 1 ? 0 : n)
  }

  const simetriasAplicadas = allTranslated.map((p, i) => {
    applyRotations(p).forEach((rotacion, index) => {  // de cada rotacion nos interesa si es igual al original y cuál es (index)
      if (areEquals(rotacion, p)) {
        // 0 Normal
        // 1 filas <--> columnas
        // 2 rotacion 90 
        // 3 Espejo horizontal
        // 4 Espejo horizontal y luego vertical
        // 5 rotacion -90 y espejo
        // 6 rotacion -90
        // 7 Espejo vertical
        switch (index) {
          case 0: // sin rotacion
            p = [...p];
            break;
          case 1:  // simetria diagonal
            /* Son com0 estos, hay que poner 0 en la esquina superior derecha si hay un 1 
            x _ _    0 _ _   _ _ _
            _ 0 _    _ x _   _ 0 _
            _ _ _    _ _ _   _ _ x
            */
            //   console.log('caso 1',i, p);
            //p = [p[0], p[1] === 1 ? 0 : p[1], p[2] === 1 ? 0 : p[2], p[3], p[4], p[5] === 1 ? 0 : p[5], p[6], p[7], p[8]];
            p = ponerCeros(p, [1, 0, 0, 1, 1, 0, 1, 1, 1]);
            // console.log(p);
            break;
          case 2:
            // en la rotacion de 90º solo coincide el centro, no puede ser ninguna
            //   console.log('caso 2',i, p);
            p = [...p];
            break;
          case 3:   // simetrias horizontales
            //  console.log('caso 3',i, p);
            //p = [p[0] === 1 ? 0 : p[0], p[1] === 1 ? 0 : p[1], p[2] === 1 ? 0 : p[2], p[3], p[4], p[5], p[6], p[7], p[8]];
            p = ponerCeros(p, [0, 0, 0, 1, 1, 1, 1, 1, 1]);
            break;
          case 4: /// espejo horizontal y vertical
            // console.log('caso 4',i, p);
            //p = [p[0] === 1 ? 0 : p[0], p[1] === 1 ? 0 : p[1], p[2] === 1 ? 0 : p[2], p[3] === 1 ? 0 : p[3], p[4], p[5] === 1 ? 0 : p[5], p[6], p[7], p[8]];
            p = ponerCeros(p, [0, 0, 0, 0, 1, 0, 1, 1, 1]);
            break;
          case 5: /// rotacion -90 y espejo
            // quitamos la esquina superior izquierda
            // console.log('caso 5',i, p);
            //p = [p[0] === 1 ? 0 : p[0], p[1] === 1 ? 0 : p[1], p[2], p[3] === 1 ? 0 : p[3], p[4], p[5], p[6], p[7], p[8]];
            p = ponerCeros(p, [0, 0, 1, 0, 1, 1, 1, 1, 1]);
            break;
          case 6:   /// rotacion -90   no hay ninguna
            //console.log('caso 6',i, p);
            p = [...p];
            break;
          case 7: ///// espejo vertical, quitamos el lado izquierdo
            //console.log('caso 7',i, p);
            // p = [p[0] === 1 ? 0 : p[0], p[1], p[2], p[3] === 1 ? 0 : p[3], p[4], p[5], p[6] === 1 ? 0 : p[6], p[7], p[8]];
            p = ponerCeros(p, [0, 1, 1, 0, 1, 1, 0, 1, 1]);
            break;
        }
      }
    });
    // console.log(p);
    return p;
  }
  );

  console.log('Simetrias Aplicadas', simetriasAplicadas);
  // Si es de 1 4 granos, si es de 2, 2 y de 3, 1
  const granosColocados = simetriasAplicadas.map(p => p.map(tic => tic === 1 ? [0, 4, 2, 1][contar(p, '×')] : tic))  // Pone los granos iniciales dependiendo de la jugada
  console.log('Granos Colocados', granosColocados);

  return [[0, 0, 0, 0, 8, 0, 0, 8, 8], ...granosColocados];  // Añadimos la situacion 0, que es especial
}

const boxesSubject = new BehaviorSubject([]);

function generateAdjusts() {
  const allBoxes = allGames();
  boxesSubject.next(allBoxes);
  return boxesSubject;
}

function printDivBoxes(allBoxes) {
  const divBoxes = allBoxes
    //  .map(translateBoxAdjust)
    .map(
      (b, i) => `
  <div class="boardadjust" id="board${b.join("")}">
  <div class="hoverNumber">${i}</div>
  <table>
  <tr><td class="td0">${b[0]}</td><td class="td1">${b[1]}</td><td class="td2">${b[2]}</td></tr>
  <tr><td class="td3">${b[3]}</td><td class="td4">${b[4]}</td><td class="td5">${b[5]}</td></tr>
  <tr><td class="td6">${b[6]}</td><td class="td7">${b[7]}</td><td class="td8">${b[8]}</td></tr>
  </table>
  </div>`
    )
    .join(" ");
  document.querySelector("#ajust").innerHTML = divBoxes;
}


function buscarBox(allBoxes, game) {


  console.log('Contar', contar(game, 0), game);

  if (contar(game, 0) == 1) {
    return { boxIndex: -1, boxRotationIndex: -1 };
  }

  function traducirACeros(p) {
    return p.map(n => isNaN(n) ? { "◯": 1, "×": 2 }[n] : 0);
  }  // Traducir de menace al juego

  const boxIndex = allBoxes.findIndex(box =>
    applyRotations(traducirACeros(box)).some(b => areEquals(b, Object.values(game))));
  // console.log(boxIndex, Object.values(game), applyRotations(traducirACeros(allBoxes[26])));
  // console.log(Object.values(game), applyRotations(traducirACeros(allBoxes[boxIndex])));
  const boxRotationIndex = applyRotations(traducirACeros(allBoxes[boxIndex])).findIndex(b => areEquals(b, Object.values(game)));
  return { boxIndex, boxRotationIndex };
}


const moveSubject = new BehaviorSubject([]);
const IAClick = new Subject();

function IATurn(state) {
  const turn = state.turn;
  const game = [...state.game];
  console.log('IA Turn', turn);
  if (turn == 2) {
    // Detectar la partida del menace que es igual
    const allBoxes = boxesSubject.getValue();
    const partida = buscarBox(allBoxes, game);

    console.log('%c' + "Partida IA", 'background-color: #248857; padding: 5px', partida, allBoxes[partida.boxIndex]);


    if (partida.boxIndex === -1) { // Ja sols queda una opció
      const max = game.findIndex(e => e === 0);
      IAClick.next(max);
    }
    else {
      const menaceBox = allBoxes[partida.boxIndex];   // el box que és igual encara que rotat

      const rotationsMenaceBox = applyRotations(menaceBox)[partida.boxRotationIndex];
      /// el box que és igual rotat per a que siga igual
      //console.log("Rotations menace box",rotationsMenaceBox);resetMenace
      //// Traguem un array de beans que representen les posicions possibles a triar
      //// Aquest array els beans que indica el número per a que siguen més probables 
      const beans = rotationsMenaceBox.map((n, i) => isNaN(n) ? [] : new Array(n).fill(i)).flat();
      // Aquest max és millor per ser aleatori amb proporcions
      const max = beans[Math.floor(Math.random() * beans.length)]

      // Ara cal guardar el box i la posició que ha triat
      // Primer "rotem" el max:
      const rotatedMax = applyRotationPosition(max, partida.boxRotationIndex);
      moveSubject.next([...moveSubject.getValue(), 
      { max: rotatedMax, boardId: `#board${menaceBox.join('')}`, index: partida.boxIndex}]);

      // console.log('rotation menace', rotationsMenaceBox, partida.boxRotationIndex, max);

      //game[max] = 2;   // LA decisió del menace
      IAClick.next(max);
    }
  }
}


function informWinner(winner){
  if(winner == 2){ /// IA Winner
    console.log('%c' + "IA is the Winner !!!", 'background-color: #248857; padding: 5px');
    ////////// Si guanya la IA, ha de augmentar en un els beans dels boxes triats
    let moves = moveSubject.getValue();
    let allBoxes = boxesSubject.getValue();
    for(let move of moves){
      allBoxes[move.index][move.max] +=1;
      move.boardId = `#board${allBoxes[move.index].join('')}`;
    }
    boxesSubject.next(allBoxes);
    moveSubject.next(moves);
  }
}


function resetMenace(){
  moveSubject.next([]);
  boxesSubject.next(boxesSubject.getValue());

}


function printMove(moves) {
  // console.log('print move',moves);
  for (let move of moves) {
//     console.log(move);
    let boardDiv = document.querySelector(move.boardId);
    //  console.log(boardDiv);
    boardDiv.classList.add('destacada');
    let moveTd = boardDiv.querySelector('.td' + move.max);
    moveTd.classList.add('seleccionada')
  }
}