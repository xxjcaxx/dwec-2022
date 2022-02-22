const app = new Realm.App({ id: 'futbol-rqxxa' });




async function loginAnonymous() { // https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-anonymous
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
      // Authenticate the user
      const user = await app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      console.assert(user.id === app.currentUser.id)
      return user
    } catch(err) {
      console.error("Failed to log in", err);
    }
}
/*  loginAnonymous().then(user => {
    console.log("Successfully logged in!", user);

   // const mongodb = app.currentUser.mongoClient('mongodb-atlas');
  //  const equips = mongodb.db("futbol").collection("equips");

  //  equips.find({}).then(listEquips => console.log(listEquips));

  })*/


  async function insertar1Equipo(){
    let  equipos = await fetch('equipos.json');
    equipos = await equipos.json();
    console.log(equipos); 
    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const equips = mongodb.db("futbol").collection("equips");
//https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document
    const result = await equips.insertOne(equipos[2]);
    console.log(result);
  }


  async function insertarEquipos(){
    let  equipos = await fetch('equipos.json');
    equipos = await equipos.json();
    console.log(equipos); 
    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const equips = mongodb.db("futbol").collection("equips");
//https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document
    let count = 0;
    let max_count = 100;
    let bufferEquipos = [];
    for (let e of equipos){
        if(e){
            count ++;
            bufferEquipos.push(e);
            if (count >= max_count){
                 const result = await equips.insertMany(bufferEquipos);
                 console.log('Insertados: ',result);
                 count = 0; bufferEquipos = [];
            }
        }
    }
    const result = await equips.insertMany(bufferEquipos);
    console.log("Ultimos",result);
    //const result = await equips.insertMany(equipos[2]);
    //console.log(result);
  }


  async function borrarEquipos(){
 
    const mongodb = app.currentUser.mongoClient('mongodb-atlas');
    const equips = mongodb.db("futbol").collection("equips");
//https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document

    const result = await equips.deleteMany({});
    console.log("Borrados",result);
    //const result = await equips.insertMany(equipos[2]);
    //console.log(result);
  }


  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#loginbtn').addEventListener('click',()=>{
      loginAnonymous().then(user => {
        console.log("Successfully logged in!", user);    
      })
    });

    document.querySelector('#insertarbtn').addEventListener('click',()=>{
        insertarEquipos();
    });
    document.querySelector('#borrarbtn').addEventListener('click',()=>{
        borrarEquipos();
    });
});
