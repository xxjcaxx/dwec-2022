(() => {
  document.addEventListener("DOMContentLoaded", () => {

    let contingut = document.querySelector('#contingut');

    function simularXarxa(n) {
      let resultat = '';
      if (Math.random() > 0.5) {
        resultat = `Peticio: ${n}`;
      }
      else {
        resultat = 0
      }
      return resultat;
    }

    for(let i=0;i<100;i++){
      let divResultat = document.createElement('div');
      divResultat.innerHTML = `<h2>R${i}</h2>`;
      contingut.append(divResultat);
      setTimeout(()=>{
        console.log(divResultat);
        let contingut = document.createElement('p');
        contingut.innerHTML=simularXarxa(i);
        divResultat.append(contingut);
      },Math.random()*3000);
    }

  });
})();



///////////// Arreglar el codi per a que cada petició a simularXarxa siga una promesa i que la torne a intentar fins a que funcione
//////////// Mentre l'arregla, mostrarà gif indicant que està carregant