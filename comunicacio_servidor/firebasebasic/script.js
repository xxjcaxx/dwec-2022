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
      console.log(productes);
    });

  let item = { nom: "android", preu: "200" };

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

  let prod = productes[0];
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
    });
}

firebaseProductes();
