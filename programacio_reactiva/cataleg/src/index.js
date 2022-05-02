import { debounceTime, fromEvent, of, takeUntil } from "rxjs";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const divExemple1 = document.querySelector("#exemple1");
  fromEvent(divExemple1, "scroll")
    .pipe
    (
      debounceTime(10)
    )
    .subscribe((event) => {
      document.querySelector('#exemple1info').innerHTML = event.target.scrollTop;
    });

    const source = of(1, 2, 3, 4, 5);
    const subscribe = source.subscribe(val => 
      document.querySelector('#exemple2info').innerHTML += val);














});
