(() => {
  let x = 0;
  console.log("Primer: ", x);
  x++;

  setTimeout(() => {
    console.log("Primer Timeout 0s", x);
    x++;
    Promise.resolve().then(() => {
      console.log("Promesa primer timeout", x);
      x++;
    });
  }, 0);

  document.addEventListener("DOMContentLoaded", () => {
    console.log("Espera al DOM: ", x);
    x++;
  });

  console.log("Segon:", x);
  x++;

  setTimeout(() => {
    console.log("Timeout 1s", x);
    x++;
  }, 1000);

  setTimeout(() => {
    console.log("Segon Timeout 0s", x);
    x++;
  }, 0);

  Promise.resolve().then(() => {
    console.log("Promise Resolve:", x);
    x++;
  });

  let i = 0;

  //// Tasca costosa en el fil principal

  let start = Date.now();

  function count() {
    // do a heavy job
    console.log("comença tasca costosa", x);
    x++;

    for (let j = 0; j < 1e9; j++) {
      i++;
    }

    console.log("tasca costosa feta en: " + (Date.now() - start) + "ms");
  }

  //count();

  ///////////// Fi de tasca constosa en fil principal

  // tasca costosa en un timeout

  setTimeout(count, 0);

  console.log("Tercer", x);
  x++;
})();
