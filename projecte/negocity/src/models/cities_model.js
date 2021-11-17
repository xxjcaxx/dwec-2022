import { Building } from "./buildings_model.js";
import { Model } from "./model.js";
export { City, CityList }

    class City extends Model {
        constructor(id) {  // En realitat no necessitem indicar tots els camps perquè els assignarem amb assign
            super(id,app.url+'/negocity/api/city/?id='+id);
        }
        static nombre = 'Cities'
    }


    class CityList extends Model {
        constructor() {
            super(0,app.url+'/negocity/api/cities/'+ localStorage.getItem("id"));
           // console.log(this);
            this.service.read().then(()=>{
                console.log('cities loaded');
                this.service.Items.forEach(i=>{
                    i.buildings = i.buildings.map(b=> new Building(b,app.url+'/negocity/api/building/?id='+b))
                    i.buildings = i.buildings.map(b => b.service.read())
                });
            });
         
       
        }
        static nombre = 'CitiesList'
    }