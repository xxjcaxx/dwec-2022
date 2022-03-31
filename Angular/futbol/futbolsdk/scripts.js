const app = new Realm.App({ id: "futbol-rqxxa" });

async function loginAnonymous() {
  // https://docs.mongodb.com/realm/web/authenticate/#std-label-web-login-anonymous
  // Create an anonymous credential
  const credentials = Realm.Credentials.anonymous();
  try {
    // Authenticate the user
    const user = await app.logIn(credentials);
    // `App.currentUser` updates to match the logged in user
    console.assert(user.id === app.currentUser.id);
    return user;
  } catch (err) {
    console.error("Failed to log in", err);
  }
}
/*  loginAnonymous().then(user => {
    console.log("Successfully logged in!", user);

   // const mongodb = app.currentUser.mongoClient('mongodb-atlas');
  //  const equips = mongodb.db("futbol").collection("equips");

  //  equips.find({}).then(listEquips => console.log(listEquips));

  })*/

async function insertar1Equipo() {
  let equipos = await fetch("equipos.json");
  equipos = await equipos.json();
  console.log(equipos);
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const equips = mongodb.db("futbol").collection("equips");
  //https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document
  const result = await equips.insertOne(equipos[2]);
  console.log(result);
}

async function insertarEquipos() {
  let equipos = await fetch("equipos.json");
  equipos = await equipos.json();
  console.log(equipos);
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const equips = mongodb.db("futbol").collection("equips");
  //https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document
  let count = 0;
  let max_count = 100;
  let bufferEquipos = [];
  for (let e of equipos) {
    if (e) {
      count++;
      bufferEquipos.push(e);
      if (count >= max_count) {
        const result = await equips.insertMany(bufferEquipos);
        console.log("Insertados: ", result);
        count = 0;
        bufferEquipos = [];
      }
    }
  }
  const result = await equips.insertMany(bufferEquipos);
  console.log("Ultimos", result);
  //const result = await equips.insertMany(equipos[2]);
  //console.log(result);
}

async function borrarEquipos() {
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const equips = mongodb.db("futbol").collection("equips");
  //https://docs.mongodb.com/realm/web/mongodb/#insert-a-single-document

  const result = await equips.deleteMany({});
  console.log("Borrados", result);
  //const result = await equips.insertMany(equipos[2]);
  //console.log(result);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#loginbtn").addEventListener("click", () => {
    loginAnonymous().then((user) => {
      console.log("Successfully logged in!", user);
    });
  });

  document.querySelector("#insertarbtn").addEventListener("click", () => {
    insertarEquipos();
  });
  document.querySelector("#borrarbtn").addEventListener("click", () => {
    borrarEquipos();
  });

  document.querySelector("#mostrarScrap").addEventListener("click", () => {
    mostrarScrap();
  });

  document.querySelector("#mostrarPlayers").addEventListener("click", () => {
    mostrarPlayers();
  });

  document.querySelector("#OdooPlayers").addEventListener("click", () => {
    OdooPlayers();
  });
});

async function mostrarScrap() {
  let players = await fetch("scrap/marca-fantasy-scraper/laliga/todos.json");
  players = await players.json();
  console.log(players);

  let onlyplayers = players.map((p) => {
    p = { ...p };
    delete p.team;
    return p;
  });

  console.log(onlyplayers);

  let onylteams = [...new Set(players.map((p) => p.team.id))]
    .map((t) => players.find((p) => p.team.id == t))
    .map((p) => p.team);

  console.log(onylteams);

  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const pdb = mongodb.db("futbol").collection("players");
  // const result = await pdb.insertMany(onlyplayers);
  // console.log("Players insert", result);

  const tdb = mongodb.db("futbol").collection("liga");
  //const resultt = await tdb.insertMany(onylteams);
  //console.log("teams insert", resultt);
}

async function mostrarPlayers() {
  let players = await fetch("scrap/marca-fantasy-scraper/laliga/todos.json");
  players = await players.json();
  console.log(players);

  let onlyplayers = players.map((p) => {
    p = { ...p };
    delete p.team;
    return p;
  });

  let divPlayers = document.querySelector("#players");

  let imgs = await fetch("scrap/marca-fantasy-scraper/img/images.json");
  imgs = await imgs.json();

  onlyplayers.forEach((p) => {
    // console.log(imgs);
    //imgs.find((i) => true);
    let currentImg = imgs.find((i) =>
      p.images.transparent["256x256"].includes(i.name)
    ); //.player = p.id;
    //console.log(currentImg);
    currentImg.player = p.id;
  });
  console.log(imgs);

  //onlyplayers.forEach((p) => {
  //let imgP = document.createElement("img");
  // imgP.src = p.images.transparent["256x256"];
  //divPlayers.append(imgP);

  // });

  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const pdb = mongodb.db("futbol").collection("images");
  for (let i of imgs) {
    const result = await pdb.insertOne(i);
    console.log("Images insert", result);
  }

  divPlayers.innerHTML = JSON.stringify(
    onlyplayers.map((p) => p.images.transparent["256x256"])
  );
}

async function OdooPlayers() {
  let players = await fetch("scrap/marca-fantasy-scraper/laliga/todos.json");
  players = await players.json();
  console.log(players);

  let onlyplayers = players.map((p) => {
    p = { ...p };
   // delete p.team;
    return p;
  });

  let divPlayers = document.querySelector("#players");

  let imgs = await fetch("scrap/marca-fantasy-scraper/img/images.json");
  imgs = await imgs.json();
  console.log(imgs);

  let playersIMGs = onlyplayers.map((p) => {
    p.imageB64 = imgs.find((i) =>
      p.images.transparent["256x256"].includes(i.name)
    ).img;
    //console.log(p.imageB64);
    return p;
  });


  let teams = players.map(p=> { return {id: p.team.id, name: p.team.name, badge: p.team.badgeColor} });
  
  teams = [...new Set(teams.map(t=> t.name))]
       .map(t=> { 
         let teamActual = teams.find(T=> T.name === t);
         return {name: t, badge: teamActual.badge, id: teamActual.id}
        });
  
  let badges = await fetch("scrap/marca-fantasy-scraper/badges.json");
  badges = await badges.json()

  teams = teams.map(t => {
   // console.log(t.badge,t.badge.split('/').at(-1));
    t.badge = badges.find(b => b.name === t.badge.split('/').at(-1)).img;
    return t;
  });

  console.log(teams);

  let teamsOdoo = teams.map( (t) => ` <record id="pcfutbol.team_${t.id}" model="pcfutbol.team">
  <field name="name">${t.name}</field>
  <field name="shield">${t.badge}</field>
  
</record>`)

  let playersOdoo = playersIMGs.map(
    (p) => ` <record id="pcfutbol.player_${p.id}" model="pcfutbol.player">
  <field name="name">${p.name}</field>
  <field name="points">${p.points}</field>
  <field name="position">${p.positionId}</field>
  <field name="state">${p.playerStatus}</field>
  <field name="image">${p.imageB64}</field>
  <field name="team" ref="pcfutbol.team_${p.team.id}"></field>
</record>`
  );

  let odooRecords = "<odoo><data>" + teamsOdoo + playersOdoo +  "</data></odoo>";

  divPlayers.innerText = `${odooRecords}`;
}
