(function () {
  "use strict";
  const lletres = "TRWAGMYFPDXBNJZSQVHLCKET".split("");
  const arrayDNIs = ["124312", "12345678", "sadf21123", "11111111", "22222222"];

  function validar(dni) {
    if (!isNaN(dni) && dni.length == 8) {
      return true;
    } else {
      return false;
    }
  }

  function lletra(dni) {
    /*let lletres = ["T", "R", "W", "A", "G", "M", "Y", "F", "P",
        "D", "X", "B", "N", "J", "Z", "S",
        "Q", "V", "H", "L", "C", "K", "E", "T"];*/
    return lletres[parseInt(dni) % 23];
  }

  function calcularLletra() {
    //console.log(document.querySelector("#dni").value);
    let dni = this.value;
    console.log(dni);
    if (validar(dni)) {
      console.log(lletra(dni));
    } else {
      console.log("El DNI no és vàlid");
    }
  }

  for (let d of arrayDNIs) {
    if (validar(d)) {
      console.log(`DNI: ${d}${lletra(d)}`);
    } else {
      console.log("El DNI no és vàlid");
    }
  }

  for (let i = 0; i < arrayDNIs.length; i++) {
    if (validar(arrayDNIs[i])) {
      console.log(`DNI: ${d}${lletra(arrayDNIs[i])}`);
    } else {
      console.log("El DNI no és vàlid");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#dni").addEventListener("click", calcularLletra);
  });
})();
