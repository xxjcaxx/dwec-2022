function saludar( nombre:string ) {
    console.table( 'Hola ' + nombre ); // Hola John
 }
 const persona = {
    nombre: 'John'
 };
 saludar (persona.nombre);

 let nombre = 'Joaquin';
if(true){
   let nombre = 'Chimo';
}
console.log(nombre);
 

(function(){
   function saludar(quien:string, // Obligatori
                   momento?: string, // Opcional
                   objecto: string = 'la mano', ){ // Per defecte
                       if(momento){
                           console.log(`${quien} saludó con ${objecto} ${momento}`);
                       }
                       else {
                           console.log(`${quien} saludó con ${objecto}`);
                       }
   }
   saludar('Paul');
   saludar('Leto', 'por la tarde', 'el crys');
   saludar('Gurney', 'el basilet');
})();


(function(){
   const toptero = {
       posicion: 'aire',
       comunica(){
           setTimeout(() => { 
               console.log(`Posición: ${this.posicion}`);
           },1000);
       }
   }
   toptero.comunica();
})();

(() =>{
   const recogerEsencia = (cantidad: number): Promise<number> => {
       let cantidadActual = 1000;
       return new Promise ( (resolve,reject) =>{
           if(cantidad > cantidadActual){
               reject('No queda');
           } else {
               cantidadActual -= cantidad;
               resolve(cantidadActual);
           }
       });
   }
   recogerEsencia(500)
       .then( cantidadActual => console.log(`Queda ${cantidadActual}`))
       .catch ( err => console.warn(err));      
})();


(() =>{
   function enviar ( persona: { nombre: string }){ // Problemàtic
       console.log(`Enviando a ${persona.nombre} a Arrakis`);
   }     
   let persona = { nombre: 'Jessica', edad: 30 }
   enviar (persona);
   ///////////////////// Interfaces ///////////////////////
   interface Caracter {
       nombre: string,
       edad: number,
       familia?: string // opcional
   }
   let personaInterface: Caracter = { nombre: 'Hawat', edad: 80}
   function enviarInterface ( persona: Caracter){ // Més fàcil de mantindre
       console.log(`Enviando a ${persona.nombre} a Arrakis`);
   }   
   enviarInterface(personaInterface);
})();


(() =>{
   class Recolector {
       private piloto:string = 'fremen';
       constructor(
           public identificador: string,
           public propietario: string,
           public buenEstado: boolean = true,
           private lugar?: string
       ){}
   }
   let rec = new Recolector('1234','cofradia',true,'desierto');
   console.log(rec.piloto);
})();


(() =>{
   function imprimirConsola(constructorClase: Function){
       console.log(constructorClase);
   }
  
   @imprimirConsola  // cal descomentar experimentaldecorators en tsconfig
   class Recolector {
       constructor(
           public identificador: string,
           public propietario: string,
           public buenEstado: boolean = true,
           private lugar?: string
       ){}
   }
   let rec = new Recolector('1234','cofradia',true,'desierto');
})();
