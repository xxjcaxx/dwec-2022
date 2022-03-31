async function getcities() {
  let r = await fetch(
    "https://dwec-daw-default-rtdb.firebaseio.com/negocity/cities.json"
  );
  let datos = await r.json();
  console.log(datos);
  let datosArray = Object.entries(datos).map((c) => {
    c[1].identificador = c[0];
    return c[1];
  });
  console.log(datosArray);
}

getcities();
