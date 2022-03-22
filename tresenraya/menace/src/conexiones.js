export {getPartida, setPartida}

async function getJson(url){
const response = await fetch(url);
const result = await response.json();
return result;
}


async function setJson(url,objeto){
const response = await fetch(url, {
    method: 'post',
    headers: {
       "Content-type": "application/json; charset=UTF-8"

    },
    body: JSON.stringify(objeto)
  });
const result = await response.json();
return result;
}



async function getPartida(){
    const partida = await getJson('http://localhost:3000/partida');
    //console.log(partida);
    return partida;
}

async function setPartida(partida){
    setJson('http://localhost:3000/partida',partida);
}