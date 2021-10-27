(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let p1 = document.querySelector("#p1");

    new Promise(function executar(resolver, rechazar) {
      p1.addEventListener("click", function click(event) {
        resolver();
      });
    }).then(function () {
      p1.innerHTML = "<p>Promesa 1</p>";
    });

    /// Fes que al fer click al p2, escriga 3 paraules en un temps aleatori de diferencia

    let p2 = document.querySelector("#p2");

    function promesaN(n) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(n);
        }, Math.random() * 1000);
      });
    }

    function createN(n, element) {
      let pN = document.createElement("p");
      pN.innerHTML = n;
      element.append(pN);
    }

    p2.addEventListener("click", function click(event) {
      p2.innerHTML = "";
      promesaN(1)
        .then((n) => {
          createN(n, p2);
          return promesaN(2);
        })
        .then((n) => {
          createN(n, p2);
          return promesaN(3);
        })
        .then((n) => {
          createN(n, p2);
        });
    });

    /// Transforma, per a p3, el que fa p2 però en Promise.all  ¿Les fa seqüencialment?

    let p3 = document.querySelector("#p3");
    function promesa3N(n) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // create3N(n, p3);
          resolve(n);
        }, Math.random() * 1000);
      });
    }

    function create3N(n, element) {
      let pN = document.createElement("p");
      pN.innerHTML = n;
      element.append(pN);
    }

    p3.addEventListener("click", function click(event) {
      /*  let arrayPromeses = [promesa3N(1), promesa3N(2), promesa3N(3)];
      Promise.all(arrayPromeses).then((n) => {
        console.log(n);
        for (let numero of n) create3N(numero, p3);
      });

       for (let p of arrayPromeses) {
        p.then((n) => create3N(n, p3));
      }*/
      /// Solucio en for:
      let arrayN = [1, 2, 3];
      let promesaI = Promise.resolve();
      for (let n of arrayN) {
        promesaI = promesaI.then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              create3N(n, p3);
              resolve(n);
            }, Math.random() * 1000);
          });
        });
      }

      /// Solucio en reduce:
    });
    /// Fes que siga seqüencial amb un reduce

    /// Fes que al fer click en p4 retorne la promesa de restaurar els gif i promeses anteriors. Tardarà 1 segon en restaurar
    /// Al fer click en p5, generarà un array de números aleatori entre 1000 i 10000.
    /// Per a cada número crearà una promesa que tardarà el mateix que el número.
    /// Quan passe el temps de cada promesa, canviarà el contingut del div pel número
    /// Fes el que fa p3 amb async/await
  });
})();
