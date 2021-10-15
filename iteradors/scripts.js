import { pokemons } from "./iteradors.js";

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let contenedor = document.querySelector("#pokemons");
    let total = pokemons
      .filter((p) => p.type.includes("Grass"))
      .map((p) => {
        let divPokemon = document.createElement("div");
        divPokemon.innerHTML = `<h3>${p.name.english}</h3>
            <p>Type: ${p.type}</p>
            <p>Attack: ${p.base.Attack} </p>`;
        contenedor.append(divPokemon);
        return p;
      });
    let mitjana =
      total.reduce((anterior, actual) => anterior + actual.base.Attack, 0) /
      total.length;
    // console.log(total, mitjana);
  });
})();

function Persona(nom, edad) {
  this.nom = nom;
  this.edad = edad;
}
Persona.prototype.showEdad = function () {
  console.log(this.edad);
};

class PERSONA {
  constructor(nom, edad) {
    this.nom = nom;
    this.edad = edad;
  }
  showEdad() {
    console.log(this.edad);
  }
}

let array = [
  new Persona("Jose", 25),
  new PERSONA("Juan", 24),
  {
    nom: "Juan",
    edad: 24,
    showEdad: function () {
      console.log(this.edad);
    },
  },
  { nom: "Nuria", edad: -5 },
  { nom: "Javi", edad: 35 },
  { nom: "Andreu", edad: 15 },
  { nom: "Pepe", edad: -1 },
];

let menor = array.filter(function (persona) {
  return persona.edad < 0;
});

/*menor = [];
for (let persona of array) {
  if (persona.edad < 0) {
    menor.push(persona);
  }
}*/

console.log(menor);

let numeros = array.map((persona) => persona.edad);
/*
numeros = [];
for(let persona of array){
  numeros.push(persona.edad);
}
*/
console.log(numeros);

let mitjana =
  array.reduce((anterior, actual) => anterior + actual.edad, 0) / array.length;

console.log(mitjana);
