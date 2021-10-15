
//////////////// REPAS 5 ///////////////

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
  

  //////////// REPAS 6 /////////////////


  (function () {
    "use strict"; // Prova a descomentar
    document.addEventListener("DOMContentLoaded", function () {
      class Sunpanel {
        constructor(power) {
          this.power = power;
        }
        showPower() {
          console.log(`${this.power}W`);
        }
      }
    
      let sun1 = new Sunpanel(1000);
      console.log(sun1);
    
    
      let buttonPower = document.querySelector('#buttonPower');
      buttonPower.addEventListener('click', sun1.showPower);
      buttonPower.addEventListener('click', () => sun1.showPower());
      buttonPower.addEventListener('click', function () { sun1.showPower(); });
      buttonPower.showPower = sun1.showPower;
      buttonPower.addEventListener('click', () => buttonPower.showPower());
      buttonPower.addEventListener('click', () => this.showPower());
      buttonPower.addEventListener('click', function () { this.showPower(); });
    });
   })();
   


   ////////////// REPAS 7 //////////////////////