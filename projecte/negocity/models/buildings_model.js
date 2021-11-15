import { Model } from "./model.js";
export { Building, BuildingList }

    class Building extends Model {
        constructor(id) {  // En realitat no necessitem indicar tots els camps perquè els assignarem amb assign
            super(id,app.url+'/negocity/api/building/?id='+id);
        }
        static nombre = 'Building'
    }


    class BuildingList extends Model {
        constructor() {
            super(0,app.url+'/negocity/api/buildings/'+ localStorage.getItem("id"));
           // console.log(this);
           this.service.read().then(()=>{
            console.log('cities loaded');
        });
     }
        
        static nombre = 'BuildingList'
    }