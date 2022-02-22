document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "equipos.json"
  ).then((teams) => {
    teams.json().then((t) => {

      console.log(t);


      fetch('https://data.mongodb-api.com/app/data-bygmg/endpoint/data/beta/action/insertOne',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Request-Headers': '*',
          'api-key': '9Yu9MBjtMkUA1lCQ692UHvG4eN7ShfWrjcoKj3ldrs6wAT3530MJ09v3rGAW1rJc'
        },
        body: `{
          "dataSource": "Cluster0",
          "database": "futbol",
          "collection": "equips",
          "document": ${JSON.stringify(t[1])}
      }` 
        
        
      });

/*
      t.forEach(async team => {
        if(team){

          await fetch('https://data.mongodb-api.com/app/data-bygmg/endpoint/data/beta/action/insertOne',{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'Access-Control-Request-Headers': '*',
              'api-key': '9Yu9MBjtMkUA1lCQ692UHvG4eN7ShfWrjcoKj3ldrs6wAT3530MJ09v3rGAW1rJc'
            },
            body: `{
              "dataSource": "Cluster0",
              "database": "futbol",
              "collection": "equips",
              "document": ${JSON.stringify(team)}
          }` 
            
            
          });

        }
      });
*/
    });
  });
});
