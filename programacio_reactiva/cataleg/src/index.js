import { fromEvent, takeUntil } from "rxjs";
import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const divExemple1 = document.querySelector("#exemple1");
  fromEvent(divExemple1, "scroll")
    .pipe
    // we will discuss cleanup strategies like this in future article
    // takeUntil(userLeavesArticle)
    ()
    .subscribe((event) => {
      // calculate and update DOM
      console.log(event);
    });
});
