import { debounceTime, filter, skip, take, from, tap, fromEvent, interval, map, of, range, takeUntil, timer, takeWhile, last, takeLast, first, reduce } from "rxjs";
export const categories = [
  { id: 'creation', name: 'Operadors de creació', description: 'Permeten crear un observable a partir de qualsevol cosa. ' },
  { id: 'operators', name: 'Operadors bàsics', description: 'Dins dels pipes, podem manipular el fluxe de dades.' }
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
  },


  {

    category: 'creation',
    id: 'interval',
    name: 'interval() i timer():',
    description: ` Crea un observable que va donant números consecutius cada cert temps. Timer dona un valro quan passa un temps.
      En aquest exemple l'utilitzem per a parar l'interval`,
    htmlExemple: ` <div id="interval">
      <span id="intervalinfo">0</span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#interval&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="color: #FF0000; background-color: #FFAAAA"></span>n<span style="color: #FF0000; background-color: #FFAAAA"></span>));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#interval");
      const subscription = interval(1000).subscribe((n) => (spanExemple.innerHTML += ` ${n}`));
      timer(20000).subscribe(() => subscription.unsubscribe())
    }
  }
,

  {

    category: 'operators',
    id: 'map',
    name: 'map()',
    description: `Aquest operador és molt simple. Sols mapeja un esdeveniment en la funció que li diguem`,
    htmlExemple: ` <div id="map">
      <span id="maptoinfo">0</span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#map&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        map(n <span style="color: #333333">=&gt;</span> n<span style="color: #333333">**</span><span style="color: #0000DD; font-weight: bold">2</span>)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="color: #FF0000; background-color: #FFAAAA"></span> n<span style="color: #FF0000; background-color: #FFAAAA"></span>));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#map");
      const subscription = interval(1000).pipe(
        map(n => n**2)
      ).subscribe((n) => (spanExemple.innerHTML += ` ${n}`));
      timer(20000).subscribe(() => subscription.unsubscribe())
    }
  }
  ,

  {

    category: 'operators',
    id: 'filter',
    name: 'filter()',
    description: `L'operador filter accepta una funció que ha de retornar vertader o fals si passa el filtre`,
    htmlExemple: ` <div id="filter">
      <span id="filterinfo">0</span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">() <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#filter&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        filter(n <span style="color: #333333">=&gt;</span> n<span style="color: #333333">%</span><span style="color: #0000DD; font-weight: bold">2</span> <span style="color: #333333">==</span> <span style="color: #0000DD; font-weight: bold">0</span>)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>



`,
    method: () => {
      const spanExemple = document.querySelector("#filter");
      const subscription = interval(1000).pipe(
        filter(n => n%2 == 0)
      ).subscribe((n) => (spanExemple.innerHTML += ' '+n));
      timer(20000).subscribe(() => subscription.unsubscribe())
    }
  },

  {

    category: 'operators',
    id: 'tap',
    name: 'tap()',
    description: `Permet fer efectes col·laterals amb els valors actuals del fluxe de dades. Permet fer console.log o modificar variables o el DOM`,
    htmlExemple: ` <div id="tap">
      <span id="tapinfo">0</span>
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#tap&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        tap(n <span style="color: #333333">=&gt;</span> console.log(n))
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>

`,
    method: () => {
      const spanExemple = document.querySelector("#tap");
      const subscription = interval(1000).pipe(
       // tap(n => console.log(n))
      ).subscribe((n) => (spanExemple.innerHTML += ' '+n));
      timer(20000).subscribe(() => subscription.unsubscribe())
    }
  }

  ,

  {

    category: 'operators',
    id: 'first',
    name: 'first(), take(), takeWhile(), last(), takeLast(), skip()',
    description: `Tots aquests operadors permeten parar l'obsevable quan es rep una quantitat o fins a que s'arriba a una condició o 
    treure els últims una vegada és completat`,
    htmlExemple: ` <div id="first">
      
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%"> () <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#first&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">1000</span>).pipe(
        take(<span style="color: #0000DD; font-weight: bold">10</span>),
        tap(n<span style="color: #333333">=&gt;</span> console.log(n)),
        takeWhile(n <span style="color: #333333">=&gt;</span> n <span style="color: #333333">&lt;</span> <span style="color: #0000DD; font-weight: bold">9</span>),
        tap(n<span style="color: #333333">=&gt;</span> console.log(n)),
        takeLast(<span style="color: #0000DD; font-weight: bold">8</span>),
        skip(<span style="color: #0000DD; font-weight: bold">7</span>),
        first()
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>

`,
    method: () => {
      const spanExemple = document.querySelector("#first");
      const subscription = interval(1000).pipe(
        take(10),
       // tap(n=> console.log(n)),
        takeWhile(n => n < 9),
       // tap(n=> console.log(n)),
        takeLast(8),
        skip(7),
        first()
      ).subscribe((n) => (spanExemple.innerHTML += ' '+n));
      timer(20000).subscribe(() => subscription.unsubscribe())
    }
  }


  ,

  {

    category: 'operators',
    id: 'reduce',
    name: 'reduce()',
    description: `A l'igual que el reduce dels arrays, permet fer un càlcul en les dades que arriben.`,
    htmlExemple: ` <div id="reduce">
      
    </div>`,
    htmlCode: `
    <!-- HTML generated using hilite.me --><div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><pre style="margin: 0; line-height: 125%">() <span style="color: #333333">=&gt;</span> {
      <span style="color: #008800; font-weight: bold">const</span> spanExemple <span style="color: #333333">=</span> <span style="color: #007020">document</span>.querySelector(<span style="background-color: #fff0f0">&quot;#reduce&quot;</span>);
      <span style="color: #008800; font-weight: bold">const</span> subscription <span style="color: #333333">=</span> interval(<span style="color: #0000DD; font-weight: bold">100</span>).pipe(
        take(<span style="color: #0000DD; font-weight: bold">10</span>),
      reduce((acumulador,actual)<span style="color: #333333">=&gt;</span> acumulador<span style="color: #333333">+</span> actual)
      ).subscribe((n) <span style="color: #333333">=&gt;</span> (spanExemple.innerHTML <span style="color: #333333">+=</span> <span style="background-color: #fff0f0">&#39; &#39;</span><span style="color: #333333">+</span>n));
      timer(<span style="color: #0000DD; font-weight: bold">20000</span>).subscribe(() <span style="color: #333333">=&gt;</span> subscription.unsubscribe())
    }
</pre></div>


`,
    method: () => {
      const spanExemple = document.querySelector("#reduce");
      const subscription = interval(100).pipe(
        take(10),
      reduce((acumulador,actual)=> acumulador+ actual)
      ).subscribe((n) => (spanExemple.innerHTML += ' '+n));
      timer(20000).subscribe(() => subscription.unsubscribe())
    }
  }

];

