"use strict";
//let lletres = "TRWAGMYFPDXBNJZSQVHLCKET".split('');

function validar(dni) {
    if (!isNaN(dni) && dni.length == 8) {
        return true;
    }
    else {
        return false;
    }
}

function lletra(dni) {
    let lletres = ["T", "R", "W", "A", "G", "M", "Y", "F", "P",
        "D", "X", "B", "N", "J", "Z", "S",
        "Q", "V", "H", "L", "C", "K", "E", "T"];
    return lletres[parseInt(dni) % 23];
}

function calcularLletra(element) {
    //console.log(document.querySelector("#dni").value);
    let dni = element.value;
    console.log(dni);
    if (validar(dni)) {
        console.log(lletra(dni));
    }
    else { console.log("El DNI no és vàlid"); }
}