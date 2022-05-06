import { debounceTime, from, fromEvent, of, range, takeUntil } from "rxjs";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const divExemple1 = document.querySelector("#exemple1");
  fromEvent(divExemple1, "scroll")
    .pipe(debounceTime(10))
    .subscribe((event) => {
      document.querySelector("#exemple1info").innerHTML =
        event.target.scrollTop;
    });

  const source = of(1, 2, 3, 4, 5);
  const subscribe = source.subscribe(
    (val) => (document.querySelector("#exemple2info").innerHTML += val)
  );

  const spanExemple3 = document.querySelector("#exemple3info");
  const promesaClick = new Promise((resolve) =>
    spanExemple3.addEventListener("click", () => resolve())
  );
  from(promesaClick).subscribe(() => (spanExemple3.innerHTML = "Click!"));

  const spanExemple4 = document.querySelector("#exemple4info");
  range(1, 100).subscribe((n) => (spanExemple4.innerHTML += ` ${n}`));
});
