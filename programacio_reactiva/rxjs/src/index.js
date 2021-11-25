import { of } from "rxjs";
import { map, filter, reduce, buffer, throttleTime, throttle, debounceTime } from "rxjs/operators";
import { Observable } from "rxjs";
import { interval } from "rxjs";
import { take } from "rxjs";

/////////// Exemple de Observable d'un event
import { fromEvent } from "rxjs";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("#miBoton");
  const miObservable = fromEvent(button, "click");
  const subscription = miObservable.subscribe((event) =>
    console.log(event, "1")
  );
  const subscription2 = miObservable.subscribe((event) =>
    console.log(event, "2")
  );

  /////////// Exemple de crear un observable amb interval

  const arrayNumeros = [1, 2, 3, 4, 5, 6, 7, "a", [11, 22, 33], { a: 5 }];

  const resultat = arrayNumeros
    .map((n) => parseInt(n))
    .filter((n) => !isNaN(n));
  const suma = resultat.reduce((x, y) => x + y);
  console.log(resultat, suma);

  const source = interval(500).pipe(
    /// Declara un Observable que emet 0,1,2,3,4... cada 500 ms
    take(10), // amb pipe afegim 2 operadors: take per quedar-se en els 10 primers
    map((i) => arrayNumeros[i]) // map per mapejar cada numero
  );

  // Per treure els elements cada cert temps
  source.subscribe((x) => console.log(x));

  // Per calcular la suma al final
  source
    .pipe(
      map((n) => parseInt(n)),
      filter((n) => !isNaN(n)),
      reduce((x, y) => x + y)
    )
    .subscribe((n) => console.log(n));

  ////////////////// El doble click

  const dClick = document.querySelector("#dobleClick");
  const dClickObservable = fromEvent(dClick, "click");

  const dClickBuffer = dClickObservable.pipe(
    buffer(dClickObservable.pipe(debounceTime(250)))
    // buffer va clavant en un array valors rebuts fins que el observable de dins li envia un nou valor
    // throttleTime emet el primer click i espera 250ms en enviar el següent click
    // buffer rep el següent click i para d'acumular i emet l'array
    // també es pot fer throttle(c => interval(250))
    // El problema en throttle és que tens que fer un altre click per veure el resultat

    // Funciona millor en debounceTime, ja que emet una notificació quan han passat 250ms sense clicks
  );
  dClickBuffer.subscribe((n) => console.log(n));

  dClickBuffer.pipe(filter(clickArray => clickArray.length > 1)).subscribe(()=>console.log('Doble Click!!!'))

 

});



