(() => {
  // prettier-ignore
  let numeros = [
    2, 9, 5, 6, 7, 8, 1, 4, 3,
    6, 4, 3, 9, 5, 1, 8, 7, 2,
    8, 7, 1, 3, 4, 2, 5, 9, 6,
    7, 1, 2, 5, 6, 9, 3, 8, 4,
    3, 6, 8, 7, 1, 4, 9, 2, 5,
    4, 5, 9, 8, 2, 3, 6, 1, 7,
    9, 2, 7, 1, 3, 6, 4, 5, 0, //falten els 8
    5, 8, 6, 4, 9, 7, 2, 3, 0, // falta el 1
    1, 3, 4, 2, 0, 5, 7, 6, 9,
];

  function generar() {
    let divSudoku = document.getElementById("sudoku");
    let tablaSudoku = document.createElement("table");

    for (let i = 0; i < 9; i++) {
      // files
      let fila = document.createElement("tr");
      if ((i == 2) | (i == 5)) fila.className = "separador";
      tablaSudoku.append(fila);
      for (let j = 0; j < 9; j++) {
        // columnes
        let numero = numeros[i * 9 + j];
        let celda = document.createElement("td");
        celda.id = `celda-${i}-${j}`;
        if ((j == 2) | (j == 5)) {
          celda.className = "separador";
        }
        celda.innerHTML = `<span>${numero > 0 ? numero : ""}</span>`;
        if (numero == 0) {
          // Es pot editar
          let span = celda.querySelector("span");
          span.classList.add("editable");
          // span.contentEditable = true;
          // El llevem d'ací per tindre un millor control
          /* span.addEventListener("keydown", function(event) {
                    if (this.innerText.length === 1 && event.key != "Backspace") {
                        event.preventDefault();
                    }
                });*/
        }
        fila.append(celda);
      }
    }
    divSudoku.append(tablaSudoku);
  }

  function validar(actual) {
    let posicionActual = actual.parentElement.id
      .split("-")
      .filter((e) => e != "celda")
      .map((e) => parseInt(e));

    // console.log(posicionActual);

    let valid = true;
    let numeros = [];

    document.querySelectorAll("td").forEach((e) => (e.className = "")); //reset

    let files = document.querySelectorAll("tr");

    // obtenció dels numeros
    files.forEach((fila) => {
      let columnes = fila.querySelectorAll("span");
      columnes.forEach((columna) => numeros.push(parseInt(columna.innerText)));
    });

    /*for (let i = 0; i < files.length; i++) {
      let columnes = files[i].querySelectorAll("span");
      for (let j = 0; j < columnes.length; j++) {
        numeros.push(parseInt(columnes[j].innerText));
      }
    }*/
    //    console.log(numeros);
    // Comprovar files
    for (let i = 0; i < 9; i++) {
      // cada fila
      let fila = new Set();
      for (let j = 0; j < 9; j++) {
        const element = numeros[i * 9 + j];
        !isNaN(element) && fila.add(element);
      }
      let valida = fila.size == 9;

      if (!valida) {
        console.warn("Fila no vàlida", { fila });
        valid = false;
        if (i == posicionActual[0]) {
          // si es la fila correspondiente
          actual.parentElement.parentElement
            .querySelectorAll("td")
            .forEach((e) => e.classList.add("mal"));
        }
      }
    }

    // Comprovar columnes
    for (let i = 0; i < 9; i++) {
      // cada columna
      let columna = new Set();
      for (let j = 0; j < 9; j++) {
        const element = numeros[j * 9 + i];
        !isNaN(element) && columna.add(element);
      }
      let valida = columna.size == 9;

      if (!valida) {
        console.warn("columna no vàlida", { columna });
        valid = false;
        if (i == posicionActual[1]) {
          // si es la fila correspondiente
          let expresion = new RegExp(`celda-[0-9]-${i}`);
          let mismaColumna = [...document.querySelectorAll("td")].filter((e) =>
            expresion.test(e.id)
          );
          //console.log(mismaColumna);
          mismaColumna.forEach((e) => e.classList.add("mal"));
        }
      }
    }

    // Comprovar quadrats
    for (let i = 0; i < 3; i++) {
      // cada fila de quadrats
      for (let j = 0; j < 3; j++) {
        //cada columna de quadrats
        let quadrat = new Set();
        for (let l = 0; l < 3; l++) {
          //dins del quadrat
          for (let m = 0; m < 3; m++) {
            const element = numeros[i * 27 + j * 3 + l * 9 + m];
            // i és el desplaçament de files de quadrats 3*9
            // j és el desplaçament en eixa fila per columnes que són de 3
            // l és el desplaçament en files dins de la fila de quadrats, files de 9
            // m és el desplaçament dins del quadrat
            !isNaN(element) && quadrat.add(element);
          }
        }
        let valida = quadrat.size == 9;

        if (!valida) {
          console.warn("quadrat no vàlid", { quadrat });
          valid = false;
          if (
            i == Math.floor(posicionActual[0] / 3) &&
            j == Math.floor(posicionActual[1] / 3)
          ) {
            // si es la fila correspondiente
            //console.log({posicionActual});
            let ii = i * 3,
              jj = j * 3;
            let mismoCuadrado = [
              [ii, jj],
              [ii + 1, jj],
              [ii + 2, jj],
              [ii, jj + 1],
              [ii + 1, jj + 1],
              [ii + 2, jj + 1],
              [ii, jj + 2],
              [ii + 1, jj + 2],
              [ii + 2, jj + 2],
            ];
            mismoCuadrado = mismoCuadrado.map((e) =>
              document.querySelector(`#celda-${e[0]}-${e[1]}`)
            );
            // console.log({mismoCuadrado});
            mismoCuadrado.forEach((e) => e.classList.add("mal"));
          }
        }
      }
    }

    if (valid == false) {
      document.querySelector("#sudoku table").classList.add("mal");
    } else {
      document.querySelector("#sudoku table").classList.add("bien");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#generar").addEventListener("click", generar);

    document.querySelector("#sudoku").addEventListener("click", (event) => {
      //console.log(event.target);
      let celda = event.target;
      if (celda.tagName == "TD") {
        celda = celda.querySelector("span");
      }
      // console.log({celda});

      if (celda.classList.contains("editable")) {
        let teclado = document.createElement("div");
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
        teclado.addEventListener("click", (e) => {
          celda.innerText = e.target.innerText;
          teclado.remove();
          validar(celda);
        });
      }
    });
  });
})();
