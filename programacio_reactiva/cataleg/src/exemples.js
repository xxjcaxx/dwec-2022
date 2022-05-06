import { debounceTime, from, fromEvent, of, range, takeUntil } from "rxjs";
export const categories = [
    { id: 'creation', name: 'Operadors de creació', description: 'Permeten crear un observable a partir de qualsevol cosa. ' },
    { id: 'operators', name: 'Operadors de creació', description: 'Permeten crear un observable a partir de qualsevol cosa. ' }
];

export const exemples = [

    {
        category: 'creation',
        id: 'exemple1',
        name: 'fromEvent():',
        description: `Crea un observable a partir d'un esdeveniment`,
        htmlExemple: `<div id="exemple1">
        <div style="height: 1000px"></div>
      </div>
      <span id="exemple1info">0</span>`,
        htmlCode: `
      <div
      style="
        background: #ffffff;
        overflow: auto;
        width: auto;
        border: solid gray;
        border-width: 0.1em 0.1em 0.1em 0.8em;
        padding: 0.2em 0.6em;
      "
    >
      <pre
        style="margin: 0; line-height: 125%"
      ><span style="color: #008800; font-weight: bold">const</span> divExemple1 <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#exemple1&quot;</span>);
fromEvent(divExemple1, <span style="background-color: #fff0f0">&quot;scroll&quot;</span>)
.pipe
(
debounceTime(<span style="color: #0000DD; font-weight: bold">10</span>)
)
.subscribe((event) <span style="color: #333333">=&gt;</span> {
<span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&#39;#exemple1info&#39;</span>).innerHTML <span style="color: #333333">=</span> event.target.scrollTop;
});
</pre>
    </div>
      `,
        method: () => {
            const divExemple1 = document.querySelector("#exemple1");
            fromEvent(divExemple1, "scroll")
                .pipe(debounceTime(10))
                .subscribe((event) => {
                    document.querySelector("#exemple1info").innerHTML =
                        event.target.scrollTop;
                });
        }
    },



    {
        category: 'creation',
        id: 'exemple2',
        name: 'of():',
        description: `Crea un observable a partir d'un llista de paràmetres`,
        htmlExemple: ` <div id="exemple2">
        <span id="exemple2info"></span>
      </div>`,
        htmlCode: `
      <div
      style="
        background: #ffffff;
        overflow: auto;
        width: auto;
        border: solid gray;
        border-width: 0.1em 0.1em 0.1em 0.8em;
        padding: 0.2em 0.6em;
      "
    >
      <pre
        style="margin: 0; line-height: 125%"
      >    <span style="color: #008800; font-weight: bold">const</span> source <span style="color: #333333">=</span> of(<span style="color: #0000DD; font-weight: bold">1</span>, <span style="color: #0000DD; font-weight: bold">2</span>, <span style="color: #0000DD; font-weight: bold">3</span>, <span style="color: #0000DD; font-weight: bold">4</span>, <span style="color: #0000DD; font-weight: bold">5</span>);
<span style="color: #008800; font-weight: bold">const</span> subscribe <span style="color: #333333">=</span> source.subscribe(val <span style="color: #333333">=&gt;</span> 
<span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&#39;#exemple2info&#39;</span>).innerHTML <span style="color: #333333">+=</span> val);
</pre>
    </div>
      `,
        method: () => {
            const source = of(1, 2, 3, 4, 5);
            const subscribe = source.subscribe(
                (val) => (document.querySelector("#exemple2info").innerHTML += val)
            );

        }
    }

    ,

    {

        category: 'creation',
        id: 'exemple3',
        name: 'from():',
        description: `Transforma qualsevol promesa o iterable en un observable`,
        htmlExemple: `  <div id="exemple3">
    <span id="exemple3info">0</span>
  </div>`,
        htmlCode: `
    <div
              style="
                background: #ffffff;
                overflow: auto;
                width: auto;
                border: solid gray;
                border-width: 0.1em 0.1em 0.1em 0.8em;
                padding: 0.2em 0.6em;
              "
            >
              <pre
                style="margin: 0; line-height: 125%"
              >  <span style="color: #008800; font-weight: bold">const</span> spanExemple3 <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#exemple3info&quot;</span>);
  <span style="color: #008800; font-weight: bold">const</span> promesaClick <span style="color: #333333">=</span> <span style="color: #008800; font-weight: bold">new</span> Promise((resolve) <span style="color: #333333">=&gt;</span>
  spanExemple3.addEventListener(<span style="background-color: #fff0f0">&quot;click&quot;</span>, () <span style="color: #333333">=&gt;</span> resolve())
);
from(promesaClick).subscribe(() <span style="color: #333333">=&gt;</span> (spanExemple3.innerHTML <span style="color: #333333">=</span> <span style="background-color: #fff0f0">&quot;Click!&quot;</span>));
</pre>
            </div>
  `,
        method: () => {
            const spanExemple3 = document.querySelector("#exemple3info");
            const promesaClick = new Promise((resolve) =>
                spanExemple3.addEventListener("click", () => resolve())
            );
            from(promesaClick).subscribe(() => (spanExemple3.innerHTML = "Click!"));

        }
    }
    ,

    {

        category: 'creation',
        id: 'exemple4',
        name: 'range():',
        description: ` Crea un Observable que dona una serie de números en un interval`,
        htmlExemple: ` <div id="exemple4">
        <span id="exemple4info">0</span>
      </div>`,
        htmlCode: `
        <div
              style="
                background: #ffffff;
                overflow: auto;
                width: auto;
                border: solid gray;
                border-width: 0.1em 0.1em 0.1em 0.8em;
                padding: 0.2em 0.6em;
              "
            >
              <pre
                style="margin: 0; line-height: 125%"
              >  <span style="color: #008800; font-weight: bold">const</span> spanExemple4 <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#exemple4info&quot;</span>);
  range(<span style="color: #0000DD; font-weight: bold">1</span>, <span style="color: #0000DD; font-weight: bold">100</span>).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple4.innerHTML <span style="color: #333333">+=</span> <span style="color: #FF0000; background-color: #FFAAAA">'</span> '+n+'<span style="color: #FF0000; background-color: #FFAAAA">'</span>));
</pre>
            </div>
  `,
        method: () => {
            const spanExemple4 = document.querySelector("#exemple4info");
  range(1, 100).subscribe((n) => (spanExemple4.innerHTML += ` ${n}`));

        }
    }


];

