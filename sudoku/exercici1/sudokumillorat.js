// La millor sols fa ús dels sets per a facilitar la validació

let numeros = [
    2, 9, 5, 6, 7, 8, 1, 4, 3,
    6, 4, 3, 9, 5, 1, 8, 7, 2,
    8, 7, 1, 3, 4, 2, 5, 9, 6,
    7, 1, 2, 5, 6, 9, 3, 8, 4,
    3, 6, 8, 7, 1, 4, 9, 2, 5,
    4, 5, 9, 8, 2, 3, 6, 1, 7,
    9, 2, 7, 1, 3, 6, 4, 5, 0, //falten els 8
    5, 8, 6, 4, 9, 7, 2, 3, 1,
    1, 3, 4, 2, 0, 5, 7, 6, 9,
];

function generar() {
    let divSudoku = document.getElementById('sudoku');
    let tablaSudoku = document.createElement('table')
    for (let i = 0; i < 9; i++) { // files
        let fila = document.createElement('tr');
        if ((i == 2) | (i == 5)) fila.className = "separador";
        tablaSudoku.append(fila);
        for (let j = 0; j < 9; j++) { // columnes
            let numero = numeros[i * 9 + j];
            let celda = document.createElement('td');
            if ((j == 2) | (j == 5)) {
                celda.className = "separador";
            }
            //celda.innerHTML = `<input type="text" value="${numeros[i*9+j]}"></input>`;
            celda.innerHTML = `<span>${numero > 0 ? numero : ''}</span>`;
            if (numero == 0) { // Es pot editar
                let span = celda.querySelector('span');
                span.contentEditable = true;
                span.addEventListener("keydown", function(event) {
                    if (this.innerText.length === 1 && event.key != "Backspace") {
                        event.preventDefault();
                    }
                });
            }
            fila.append(celda);
        }
    }
    divSudoku.append(tablaSudoku);
}


let valid = true;

function validar() { // Versió molt imperativa

    valid = true;
    let numeros = [];
    let files = document.querySelectorAll('tr');
    for (let i = 0; i < files.length; i++) {
        let columnes = files[i].querySelectorAll('span');
        for (let j = 0; j < columnes.length; j++) {
            numeros.push(parseInt(columnes[j].innerText));
        }
    }
//    console.log(numeros);
    // Comprovar files
    for (let i = 0; i < 9; i++) { // cada fila
        let fila = new Set();
        for (let j = 0; j < 9; j++) {
            const element = numeros[i * 9 + j];
            !isNaN(element) && fila.add(element);
        }
        console.log({fila});
        let valida = fila.size == 9;
        
        if (!valida) {
            console.warn('Fila no vàlida');
            valid = false;
        }
    }

    // Comprovar columnes
    for (let i = 0; i < 9; i++) { // cada columna
        let columna = new Set();
        for (let j = 0; j < 9; j++) {
            const element = numeros[j * 9 + i];
            !isNaN(element)  && columna.add(element);
        }
        console.log({columna});
        let valida = columna.size == 9;
        
        if (!valida) {
            console.warn('columna no vàlida');
            valid = false;
        }
    }

     // Comprovar quadrats
     for (let i = 0; i < 3; i++) { // cada fila de quadrats
        for (let j = 0; j < 3; j++){ //cada columna de quadrats
        let quadrat = new Set();
        for (let l = 0; l < 3; l++) { //dins del quadrat
            for (let m = 0; m < 3; m++) {
            const element = numeros[i * 27 + j * 3 + l * 9 + m  ];
            // i és el desplaçament de files de quadrats 3*9
            // j és el desplaçament en eixa fila per columnes que són de 3
            // l és el desplaçament en files dins de la fila de quadrats, files de 9
            // m és el desplaçament dins del quadrat
            !isNaN(element)  &&  quadrat.add(element);
        }
    }
    
        console.log({quadrat});
        let valida = quadrat.size == 9;
       
        if (!valida) {
            console.warn('quadrat no vàlid');
            valid = false;
        }
    }
    }

    if(valid == false) {
        document.querySelector('#sudoku table').classList.add('mal');
    }
    else {
        document.querySelector('#sudoku table').classList.add('bien');
    }

}