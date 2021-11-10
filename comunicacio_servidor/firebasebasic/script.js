const url = "https://daw2021-d5e4c-default-rtdb.firebaseio.com/productos";

let productes = [];

async function firebaseProductes() {
  await fetch(url + ".json")
    .then((response) => response.json())
    .then((datos) => {
      console.log(datos);
      for (let key in datos) {
        datos[key].id = key;
        productes.push(datos[key]);
      }
      let divProductes = document.querySelector("#productes");
      divProductes.innerHTML = "";
      productes.map((p) => {
        let divProducte = document.createElement("div");
        divProducte.innerHTML = `<h2>${p.nom}</h2><img src="${p.img}"/><p>${p.preu}</p>`;
        divProductes.append(divProducte);
      });
    });

  //let item = { nom: "android", preu: "200" };

  /*fetch(url, {
    method: "post",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then((datos) => {
      // tractament de les dades
      console.log(datos);
    });
  */

  /* let prod = productes[0];
  prod.preu = 123456;
  let key = prod.id;
  delete prod.id;

  fetch(`${url}/${key}.json`, {
    method: "put",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(prod),
  })
    .then((response) => response.json())
    .then((datos) => {
      // tractament de les dades
      console.log(datos);
    });*/
}
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function () {
    console.log("RESULT", reader.result);
    element.imagen = reader.result;
  };
  reader.readAsDataURL(file);
}

document.addEventListener("DOMContentLoaded", () => {
  firebaseProductes();
  document.querySelector("#img").addEventListener("change", function () {
    encodeImageFileAsURL(this);
  });
  document.querySelector("#crear").addEventListener("click", function (event) {
    event.preventDefault();
    let producteNou = {
      nom: document.querySelector("#nom").value,
      preu: document.querySelector("#preu").value,
      img: document.querySelector("#img").imagen,
    };
    console.log(producteNou);

    fetch(url + ".json", {
      method: "post",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(producteNou),
    })
      .then((response) => response.json())
      .then((datos) => {
        firebaseProductes();
      });
  });
});
