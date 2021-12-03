import { doc } from "mocha/mocha-es2018";
import "./style.css";
import { doTests } from "./test.js";
import {
  from,
  fromEvent,
  interval,
  Observable,
  first,
  map,
  BehaviorSubject, //https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
  Subscription,
  skipWhile,
  filter,
} from "rxjs";

export { obtenerNumeros, validarGrupo, descargar, generarSudoku };

//const url = "static/coleccionsudokus.json";
const urlSudokus = "https://daw2021-d5e4c-default-rtdb.firebaseio.com/s";
const urlPartidas =
  "https://daw2021-d5e4c-default-rtdb.firebaseio.com/partidas";

/// Un observable interval global que pot ser utilitzat com a click de qualsevol cosa periòdica
// En el nostre cas, descarregar de firebase la partida actualitzada
const intervalObservable = interval(1000);
// Cree la subscripció inicial que no fa res per a tindre-la accessible globalment
let subscriptionInterval = intervalObservable.subscribe();

/// Una manera de mantindre l'estat simple. Ens dona la configuració de forma inmutable
const config = new BehaviorSubject({ validarAutomaticamente: false });
const partidaActual = new BehaviorSubject(0);
const wait = new BehaviorSubject(false); // Indica si tenim que parar algun Observable
// L'utilitzarem per esperar a carregar a firebase abans de descarregar de
/*
  ____ _ _            _     _   _ _____ _____ ____  
 / ___| (_) ___ _ __ | |_  | | | |_   _|_   _|  _ \ 
| |   | | |/ _ \ '_ \| __| | |_| | | |   | | | |_) |
| |___| | |  __/ | | | |_  |  _  | | |   | | |  __/ 
 \____|_|_|\___|_| |_|\__| |_| |_| |_|   |_| |_|  

*/

///////// Funció per descarregar els JSON
function descargar(url, parametres) {
  // https://stackoverflow.com/a/47057685
  // Retorna un Observable a partir del fetch
  // Creem un Observable manualment, ja que podem controlar el next en la promesa del fetch
  const fetchStream = new Observable(async (observer) => {
    try {
      const response = await fetch(url + ".json", parametres);
      const data = await response.json();
      observer.next(data);
      observer.complete();
    } catch (err) {
      observer.error(err);
    }
  });
  return fetchStream;
}

//// Funció per a enviar la partida actualtizada
function actualizarPartida() {
  wait.next(true);
  partidaActual.next({
    ...partidaActual.getValue(),
    sudoku: obtenerNumeros().flat(),
  });
  // Per conservar la inmutabilitat de la partida li llevem el id en un altre objecte
  // console.log(partidaActual.getValue());
  const id = partidaActual.getValue().id;
  const partidaSinid = { ...partidaActual.getValue() };
  delete partidaSinid.id;
  // Cridem al fetch en put per actualitzar en firebase
  const fetchStream = descargar(urlPartidas + `/${id}`, {
    method: "put",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(partidaSinid),
  });
  fetchStream.pipe(first()).subscribe(() => {
    wait.next(false);
  });
}

/// Funció per crear partida nova en firebase
function crearPartida(sudoku, nom) {
  const partida = { sudoku, nom };
  const fetchStream = descargar(urlPartidas, {
    method: "post",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(partida),
  });
  fetchStream.pipe(first()).subscribe(descargarPartidas); // força a refrescar la llista de partides
}

/// Funció per descarregar els sudokus i obtindre un aleatori
function descargarSudokus() {
  const fetchStream = descargar(urlSudokus, {});
  return fetchStream.pipe(
    first(), // Ens quedem en la primera llista de sudokus (i única)
    map((s) => {
      const keysSudokus = Object.keys(s.sudokus);
      const item = keysSudokus[Math.floor(Math.random() * keysSudokus.length)];
      return s.sudokus[item];
    })
  );
}

//// Funció per descarregar les partides
function descargarPartidas() {
  const partidas = descargar(urlPartidas, {}); // obtenim un observable de partides
  console.log(partidas);
  partidas.subscribe((p) => {
    const partidasArray = Object.entries(p).map((p) => {
      p[1].id = p[0];
      return p[1];
    });
    if (p != null) {
      generarPartidas(partidasArray); // cridem a renderitzar la llista de partides.
    }
  });
}

/*

 _   _ _   _ _ _ _        _       
| | | | |_(_) (_) |_ __ _| |_ ___ 
| | | | __| | | | __/ _` | __/ __|
| |_| | |_| | | | || (_| | |_\__ \
 \___/ \__|_|_|_|\__\__,_|\__|___/


*/

//// Funció per transformar el sudoku en 2D
const convert2D = (numeros) =>
  Array(9)
    .fill(0)
    .map((_, i) => numeros.slice(i * 9, i * 9 + 9));

/*
 _____         _                      _                      _       
| ____|___  __| | _____   _____ _ __ (_)_ __ ___   ___ _ __ | |_ ___ 
|  _| / __|/ _` |/ _ \ \ / / _ \ '_ \| | '_ ` _ \ / _ \ '_ \| __/ __|
| |___\__ \ (_| |  __/\ V /  __/ | | | | | | | | |  __/ | | | |_\__ \
|_____|___/\__,_|\___| \_/ \___|_| |_|_|_| |_| |_|\___|_| |_|\__|___/
                                                                    
*/

/////

/// Funció per afegir l'esdeveniment de click a cada cel·la del sudoku
const clikSudoku = (divSudoku) => {
  // Creem el Observable a partir d'un esdeveniment
  const clickStream = fromEvent(divSudoku, "click");
  clickStream.subscribe((event) => {
    // Si s'ha fet en una cel·la
    if (["TD", "SPAN"].includes(event.target.tagName)) {
      let celda = event.target;
      if (celda.tagName == "TD") {
        celda = celda.querySelector("span");
      }
      divSudoku.querySelectorAll(".teclado").forEach((t) => t.remove());
      const teclado = document.createElement("div");
      teclado.innerHTML = `<span>1</span>
           <span>2</span>
           <span>3</span>
           <span>4</span>
           <span>5</span>
           <span>6</span>
           <span>7</span>
           <span>8</span>
           <span>9</span>
           `;
      teclado.classList.add("teclado");
      celda.parentElement.append(teclado);
      fromEvent(teclado, "click").subscribe((e) => {
        celda.innerText = e.target.innerText;
        teclado.remove();
        actualizarPartida();
        resetClasses();
        if (config.getValue().validarAutomaticamente) {
          validar();
        }
      });
    }
  });
};

//////// Funció per atendre al canvi en validar automaticamente

const clickValidarAutomaticamente = (divSudoku) => {
  const clickStream = fromEvent(
    divSudoku.querySelector("#validarAutomaticamente"),
    "click"
  );
  clickStream.subscribe((event) => {
    config.next({
      ...config.getValue(),
      validarAutomaticamente: event.target.checked,
    });
  });
};

////////// Funció per refrescar el sudoku en dades d'Internet cada cert temps
const generarActualitzador = (p) => {
  subscriptionInterval.unsubscribe(); // llevem qualsevol subscripció anterior
  subscriptionInterval = intervalObservable
    .pipe(filter((s) => wait.getValue() == false))
    .subscribe(() => {
      // console.log(p.id);
      descargar(urlPartidas + `/${p.id}`, {})
        .pipe(
          map((partida) => {
            partida.id = p.id;
            return partida;
          })
        )
        .subscribe((partida) => partidaActual.next(partida));
    });
  partidaActual.subscribe((partida) => {
    refrescarSudoku(partida.sudoku);
  });
};

////// Funció per carregar el sudoku d'una partida seleccionada per click:
const clickCarregarSudoku = (divPartida, p) => {
  const clickStream = fromEvent(divPartida, "click");
  clickStream.subscribe(() => {
    partidaActual.next(p);
    generarSudoku(p.sudoku);
    generarActualitzador(p);
  });
};

/// Atendre al click de crear una nova partida
const clickCrearPartida = (divCrear, nom) => {
  const clickStream = fromEvent(divCrear, "click");
  clickStream.subscribe(() => {
    const streamSudokus = descargarSudokus();
    streamSudokus.subscribe((s) => {
      crearPartida(s, nom);
    });
  });
};

/*
 ____   ___  __  __ 
|  _ \ / _ \|  \/  |
| | | | | | | |\/| |
| |_| | |_| | |  | |
|____/ \___/|_|  |_|

*/

///// Funció per generar el sodoku en HTML

function generarSudoku(numeros) {
  const divSudoku = document.getElementById("sudoku");
  divSudoku.innerHTML =
    '<div class="titulo"><h2>Sudoku</h2> Validar Automaticamente <input type="checkbox" name="validarAutomaticamente" id="validarAutomaticamente"></div>';
  const tablaSudoku = document.createElement("table");
  convert2D(numeros).map((filaNumeros, i) => {
    const fila = document.createElement("tr");
    if ((i == 2) | (i == 5)) fila.className = "separador";
    tablaSudoku.append(fila);
    filaNumeros.map((columnaNumero, j) => {
      const celda = document.createElement("td");
      celda.id = `celda-${i}-${j}`;
      if ((j == 2) | (j == 5)) {
        celda.className = "separador";
      }
      celda.innerHTML = `<span>${
        columnaNumero > 0 ? columnaNumero : ""
      }</span>`;
      if (columnaNumero == 0) {
        // Es pot editar
        let span = celda.querySelector("span");
        span.classList.add("editable");
      }
      fila.append(celda);
    });
  });
  divSudoku.append(tablaSudoku);
  clikSudoku(divSudoku);
  clickValidarAutomaticamente(divSudoku);
}

/// Se li passa un sudoku i actualitza les dades en HTML
const refrescarSudoku = (sudoku) => {
  convert2D(sudoku).forEach((fila, i) => {
    fila.forEach((numero, j) => {
      const celdaSelector = `#celda-${i}-${j} span`;
      document.querySelector(celdaSelector).innerHTML = `${
        numero > 0 ? numero : ""
      }`;
    });
  });
  resetClasses();
  if (config.getValue().validarAutomaticamente) {
    validar();
  }
};

/// A partir d'una llista de partides les mostra en HTML
function generarPartidas(partidas) {
  const divPartidas = document.getElementById("partidas");
  divPartidas.innerHTML = '<div class="titulo"><h2>Partidas</h2></div>';
  partidas.forEach((p) => {
    const divPartida = document.createElement("div");
    divPartida.classList.add("partida");
    divPartida.innerHTML = p.nom; //+" "+p.id;
    divPartidas.append(divPartida);
    clickCarregarSudoku(divPartida, p);
  });
  const divCrear = document.createElement("div");
  divCrear.classList.add("partida");
  divCrear.innerHTML = "Crear Partida";
  const inputNom = document.createElement("input");
  inputNom.value = Math.random().toString(36).slice(-8);
  divCrear.append(inputNom);
  clickCrearPartida(divCrear, inputNom.value);
  divPartidas.append(divCrear);
}

////// Funció per obtindre els numeros de l'html

function obtenerNumeros() {
  // Se pot fer un map
  const files = Array.from(document.querySelectorAll("tr"));
  return files.map((fila) => {
    const columnes = Array.from(fila.querySelectorAll("td>span"));
    const filaNumeros = columnes.map((columna) => {
      const numero = parseInt(columna.innerText);
      return !isNaN(numero) ? numero : 0;
    });
    return filaNumeros;
  });
}

const resetClasses = () => {
  document.querySelectorAll("td").forEach((e) => {
    e.classList.remove("malfila");
    e.classList.remove("bien");
    e.classList.remove("malquadrat");
    e.classList.remove("malcolumna");
  }); //reset
  document.querySelector("table").className = "";
};

const marcarMal = (i, tipo) => {
  //console.log(i);
  if (tipo == "filas") {
    //console.log(document.querySelectorAll(`#sudoku table td[id^=celda-${i}]`));
    document
      .querySelectorAll(`#sudoku table td[id^=celda-${i}]`)
      .forEach((e) => e.classList.add("malfila"));
  }
  if (tipo == "columnas") {
    [0, 1, 2, 3, 4, 5, 6, 7, 8]
      .map((fila) => {
        return document.querySelector(`#sudoku table td#celda-${fila}-${i}`);
      })
      .forEach((e) => e.classList.add("malcolumna"));
  }
  if (tipo == "cuadrados") {
    [
      [0, 1, 2, 9, 10, 11, 18, 19, 20],
      [3, 4, 5, 12, 13, 14, 21, 22, 23],
      [6, 7, 8, 15, 16, 17, 24, 25, 26],
      [27, 28, 29, 36, 37, 38, 45, 46, 47],
      [30, 31, 32, 39, 40, 41, 48, 49, 50],
      [33, 34, 35, 42, 43, 44, 51, 52, 53],
      [54, 55, 56, 63, 64, 65, 72, 73, 74],
      [57, 58, 59, 66, 67, 68, 75, 76, 77],
      [60, 61, 62, 69, 70, 71, 78, 79, 80],
    ][i]
      .map((pos) => {
        return document.querySelector(
          `#sudoku table td#celda-${Math.floor(pos / 9)}-${
            pos - Math.floor(pos / 9) * 9
          }`
        );
      })
      .forEach((e) => e.classList.add("malquadrat"));
  }
};

const marcarMalSudoku = (valid) => {
  if (valid == false) {
    document.querySelector("#sudoku table").classList.add("mal");
  } else {
    // solucionat
    document.querySelector("#sudoku table").classList.add("bien");
  }
};
/*
__     __    _ _     _            _                 
\ \   / /_ _| (_) __| | __ _  ___(_) ___  _ __  ___ 
 \ \ / / _` | | |/ _` |/ _` |/ __| |/ _ \| '_ \/ __|
  \ V / (_| | | | (_| | (_| | (__| | (_) | | | \__ \
   \_/ \__,_|_|_|\__,_|\__,_|\___|_|\___/|_| |_|___/

*/

///////////// Valida un set de 9 números
const validarGrupo = (grupo) => grupo.size == 9;

///////////// Valida un array de grups (totes les files, columnes o quadrats)
const validarGrupos = (numeros, tipo) =>
  numeros
    .map((filaNumeros, i) => {
      const fila = new Set(filaNumeros.filter((n) => n > 0));
      const valida = validarGrupo(fila);
      if (!valida) {
        marcarMal(i, tipo);
      }
      return valida;
    })
    .every((fila) => fila);

///////// Valida files
const validarFilas = (numeros) => validarGrupos(numeros, "filas");
///////// Valida columnes invertint el sudoku
const validarColumnas = (numeros) =>
  validarGrupos(
    numeros[0].map((_, index) => numeros.map((fila) => fila[index])),
    "columnas"
    // transpose sols funciona en nxm si n==m
  );

//////////////// Conjunt de funcions necessàries per a validar els quadrats

///// Retorna array de indexes per obtindre fàcilment els quadrats
const getIndexes = (n) =>
  n === 1 ? [0, 1, 2] : n === 2 ? [3, 4, 5] : [6, 7, 8];

///// Transforma un array d'arrays en un array tot seguit.
/// Al final no fa falta perquè existexi la funció flat(). El deixe per curiositat
const flat2DArray = (array) => array.reduce((ant, act) => [...ant, ...act], []);

////////// A partir dels indexes, una x e y del quadrat, treu un array del número de l'array
const getValues = (x, y, numeros) =>
  getIndexes(x)
    .map((fila) => getIndexes(y).map((columna) => numeros[fila][columna]))
    .flat();
///////////
/////////  https://gist.github.com/maxx1128/c5c62dd09291f10bc7e8c0b77df80dbb

/////// Recorre dos array de [1,2,3] que marquen les posicions dels quadrats i per a cadascun obté els números
/// fa flat() per tindre 9 arrays de 9 i els valida

const validarCuadrados = (numeros) => {
  return validarGrupos(
    [1, 2, 3]
      .map((squareX) =>
        [1, 2, 3].map((squareY) => getValues(squareX, squareY, numeros))
      )
      .flat(),
    "cuadrados"
  );
};

/////////// Valida tot el sudoku
function validar() {
  const numeros = obtenerNumeros();
  const valid = [
    validarFilas(numeros),
    validarColumnas(numeros),
    validarCuadrados(numeros),
  ].every((fila) => fila);
  marcarMalSudoku(valid);
}

document.addEventListener("DOMContentLoaded", function () {
  //await descargarSudokus(); // És asíncrono
  descargarPartidas();
  doTests();
  //
});

//})();
