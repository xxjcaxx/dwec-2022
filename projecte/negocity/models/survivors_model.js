import { Model } from "./model.js";
export { Survivor, SurvivorList }

    class Survivor extends Model {
        constructor(id) {  // En realitat no necessitem indicar tots els camps perquè els assignarem amb assign
            super(id);
        }
        static nombre = 'survivors'
    }


    class SurvivorList extends Model {
        constructor() {
            super(0,app.url+'/negocity/api/survivors/'+ localStorage.getItem("id"));
           // console.log(this);
           this.service.read();
        }
        static nombre = 'survivorLists'
    }