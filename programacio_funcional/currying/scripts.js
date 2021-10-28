/// https://www.freecodecamp.org/news/how-to-use-currying-and-composition-in-javascript/

/// Array de jugadors amb la seua posició 
const players = [
  {
    name: 'Alice',
    color: 'aliceblue',
    position: { x: 3, y: 5 }
  }, {
    name: 'Benji',
    color: 'goldenrod',
    position: { x: -4, y: -4 }
  }, {
    name: 'Clarissa',
    color: 'firebrick',
    position: { x: -2, y: 8 }
  }
];
// Posició de la bandera 
const flag = { x: 0, y: 0 };




//------------   Versió en una funció normal  ---------------
const distance = (start, end) => Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));


//-------------   Versió en currying   ----------------------
const distancewithCurrying =
  (start) =>
    (end) => Math.sqrt(Math.pow(end.x - start.x, 2) +
      Math.pow(end.y - start.y, 2));



// Treure les distàncies de la manera tradicional
const distances = players.map(player => distance(flag, player.position));
console.log("Distàncies de la manera tradicional: ", distances);


// Treure les distàncies amb la funció currificada
const distanceFromFlag = distancewithCurrying(flag);
const curriedDistances = players.map(player => player.position)
  .map(distanceFromFlag)
console.log("Distàncies currificades:", curriedDistances);



//////////////////////////////////////////////////  Composition  ///////////////////////////


/* En aquest primer exemple es veu cóm es pot aplicar una funció a cada element de l'array */

const ages = [11, 14, 26, 9, 41, 24, 65, 67, 108];
// Funció tradicional de si és imparell

const isEven = (num) => num % 2 === 0 ? true : false;

console.log(ages.filter(isEven));


/* El següent exemple fa uns filtres amb currying diferents */
const isEqualTo = (comparator) => (value) => value === comparator;
const isGreaterThan = (comparator) => (value) => value > comparator;

/* Amb ajuda de les funcions anteriors, creem funcions que comproven coses de manera més específica
El primer treu una funció per saber si és igual a 7
El segon diu si té la majoria d'edat  */
const isSeven = isEqualTo(7);
const isOfLegalMajority = isGreaterThan(18);

console.log(isSeven(5), isSeven(7), isOfLegalMajority(10), isOfLegalMajority(20));

/* Fem una altra funció per treure el contrari i l'aprofitem amb ajuda de isGreaterThan per treure un altre filtre */
const isNot = (value) => !value;
const isLessThanOrEqualTo = (comparator) => (value) => isNot(isGreaterThan(comparator)(value));

// Ara tenim una funció que aprofita les anteriors per saber si algú és menor de 65
const isTooYoungToRetire = isLessThanOrEqualTo(65);


console.log(ages.filter(isTooYoungToRetire));


/* Amb aquestes funcions podem fer coses més complexes: */

const isInRange =
  (minComparator) =>
    (maxComparator) =>
      (value) => isGreaterThan(minComparator)(value) && isLessThanOrEqualTo(maxComparator)(value);

const isTwentySomething = isInRange(19)(30);

console.log(ages.filter(isTwentySomething));

