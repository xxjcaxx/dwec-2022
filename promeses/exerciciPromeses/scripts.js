(() => {
  document.addEventListener("DOMContentLoaded", () => {

    let p1 = document.querySelector('#p1');

    new Promise(function executar(resolver, rechazar) {
        p1.addEventListener('click', function click(event) {
            resolver();
        })
    }).then(function () {
        p1.innerHTML = '<p>Promesa 1</p>';
    });


    /// Fes que al fer click al p2, escriga 3 paraules en un temps aleatori de diferencia
    /// Transforma, per a p3, el que fa p2 però en Promise.all  ¿Les fa seqüencialment?
    /// Fes que siga seqüencial amb un reduce
    /// Fes que al fer click en p4 retorne la promesa de restaurar els gif i promeses anteriors. Tardarà 1 segon en restaurar
    /// Al fer click en p5, generarà un array de números aleatori entre 1000 i 10000.
      /// Quan passe el temps de cada promesa, canviarà el contingut del div pel número
    /// Fes el que fa p3 amb async/await






  });
})();
