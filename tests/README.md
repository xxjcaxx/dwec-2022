# Tests en Mocha

La combinació de Mocha+Chai per a fer tests en JS és una de les més utilitzades. En el cas del desenvolupament web en la part de client, tenim moltes opcions. En aquest manual amb exemples, anem a veure algunes de les opcions.

## Tests en Mocha+Chai en el navegador

La primera i més fàcil és executar mocha.js en el navegador dirèctament. Cal afegir els .js i .css corresponents i els tests. Aquest exemple el tenim en el directori de fibonnaci.

## Tests En CLI

També podem executar els tests per la terminal directament en cas de que no tinguen cap referència a "document", per exemple, ja que per la terminal s'executa amb nodejs i aquest no té un navegador. En cas de necessitar accedir al DOM, podem instal·lar jsdom:

```bash
npm install --save-dev --save-exact jsdom jsdom-global
```

I executar mocha amb:

```bash
mocha -r jsdom-global/register
```

Als fitxers de tests cal importar chai:

```javascript
import chai from 'chai';
```

## Tests en Mocha+Chai+Webpack en el navegador

Webpack empaqueta fitxers de Javascript i crea un bundle. El bundle, una vegada fet, és difícil d'accedir. Per això, cal fer tests abans o incorporar els tests al bundle.

```bash
npm install webpack webpack-cli --save-dev
npm install --save-dev html-webpack-plugin
npm install webpack webpack-cli --save-dev
npm install --save-dev style-loader css-loader
```


En aquest cas, els incorporem amb:

```javascript
import  'mocha/mocha.css';
import mocha from "mocha/mocha-es2018";
import chai from  'chai';
```

Tenim que importar mocha-es2018 perquè és el que webpack pot empaquetar, ja que té sintaxi de mòduls com ES6. 

L'exemple el teniu en fibonacciWP. 

En cas de no voler fer tests, sols cal llevar la línia de importació del fitxer de tests.