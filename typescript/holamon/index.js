"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function saludar(nombre) {
    console.table('Hola ' + nombre); // Hola John
}
const persona = {
    nombre: 'John'
};
saludar(persona.nombre);
let nombre = 'Joaquin';
if (true) {
    let nombre = 'Chimo';
}
console.log(nombre);
(function () {
    function saludar(quien, // Obligatori
    momento, // Opcional
    objecto = 'la mano') {
        if (momento) {
            console.log(`${quien} saludó con ${objecto} ${momento}`);
        }
        else {
            console.log(`${quien} saludó con ${objecto}`);
        }
    }
    saludar('Paul');
    saludar('Leto', 'por la tarde', 'el crys');
    saludar('Gurney', 'el basilet');
})();
(function () {
    const toptero = {
        posicion: 'aire',
        comunica() {
            setTimeout(() => {
                console.log(`Posición: ${this.posicion}`);
            }, 1000);
        }
    };
    toptero.comunica();
})();
(() => {
    const recogerEsencia = (cantidad) => {
        let cantidadActual = 1000;
        return new Promise((resolve, reject) => {
            if (cantidad > cantidadActual) {
                reject('No queda');
            }
            else {
                cantidadActual -= cantidad;
                resolve(cantidadActual);
            }
        });
    };
    recogerEsencia(500)
        .then(cantidadActual => console.log(`Queda ${cantidadActual}`))
        .catch(err => console.warn(err));
})();
(() => {
    function enviar(persona) {
        console.log(`Enviando a ${persona.nombre} a Arrakis`);
    }
    let persona = { nombre: 'Jessica', edad: 30 };
    enviar(persona);
    let personaInterface = { nombre: 'Hawat', edad: 80 };
    function enviarInterface(persona) {
        console.log(`Enviando a ${persona.nombre} a Arrakis`);
    }
    enviarInterface(personaInterface);
})();
(() => {
    class Recolector {
        constructor(identificador, propietario, buenEstado = true, lugar) {
            this.identificador = identificador;
            this.propietario = propietario;
            this.buenEstado = buenEstado;
            this.lugar = lugar;
            this.piloto = 'fremen';
        }
    }
    let rec = new Recolector('1234', 'cofradia', true, 'desierto');
    console.log(rec.piloto);
})();
(() => {
    function imprimirConsola(constructorClase) {
        console.log(constructorClase);
    }
    let Recolector = class Recolector {
        constructor(identificador, propietario, buenEstado = true, lugar) {
            this.identificador = identificador;
            this.propietario = propietario;
            this.buenEstado = buenEstado;
            this.lugar = lugar;
        }
    };
    Recolector = __decorate([
        imprimirConsola // cal descomentar experimentaldecorators en tsconfig
    ], Recolector);
    let rec = new Recolector('1234', 'cofradia', true, 'desierto');
})();
