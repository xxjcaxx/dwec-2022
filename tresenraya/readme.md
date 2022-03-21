# Tres en raya en Javascript

La idea de este proyecto es ir haciendo el juego de 3 en raya para aprender Javascript y programación funcional y reactiva con Javascript.

Empezaremos con una interfaz simple para que puedan jugar dos jugadores en el mismo ordenador. A continuación lo haremos con un servidor en medio, que nos permitirá hacer partidas on-line. Esto lo iremos combinando con programación funcional y reactiva.

En la carpeta inicial tenemos la interfaz más simple. Permite jugar por turnos y dice quien gana. Intenta ser lo más funcional posible, no obstante, inevitablemente, las funciones que afectan a la interfaz tienen efectos colaterales. El estado del programa son los turnos y la posición de los 0 X. Para mantenerlo lo hemos puesto en una closure con funciones para acceder a él y modificarlo de forma controlada. 

Para hacer que este juego sea multijugador, vamos a poner un servidor en medio. Este servidor tendrá una API rest muy simple. Guardaremos el turno y la situación de la partida. Lo más fácil es usar un JSON server. Cambiarlo por otro API REST en Internet debe ser simple, por eso, la manera de conectar, la vamos a centralizar y será fácilmente modificable.

Puesto que vamos a necesitar varios archivos JS y vamos a implementar testing, reactividad y otras cosas, es el momento de empezar a pensar en que el código va a quedar muy largo y difícil de gestionar. Por eso utilizaremos un empaquetador como es Webpack. Para los test, haremos uso de las librerías Mocha y Chai, y para la reactividad, haremos uso de RxJS. 

```
npm init
npm install webpack webpack-cli html-webpack-plugin style-loader css-loader webpack-dev-server mocha chai rxjs
echo "node_modules" >> .gitignore
```

