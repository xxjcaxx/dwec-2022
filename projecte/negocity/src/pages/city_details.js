export {CityDetails};
import {Controller} from '../controllers/controller.js'
import {Model} from '../models/model.js'
import {CityView} from '../views/cities_views.js'


function CityDetails(city){
  
  let cityController = new Controller(
    new Model(0,app.url+'/negocity/api/city/?id='+ city),
    new CityView(app.container,'details')
  );



}