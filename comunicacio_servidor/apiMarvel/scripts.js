(() => {
  async function getCharacters() {
    let response = await fetch(
      "https://gateway.marvel.com:443/v1/public/characters?apikey=09186f978ec0616e9dba9c4ac4b0c4bb"
    );
    let data = await response.json();

    /* fetch(
        "https://gateway.marvel.com:443/v1/public/characters?apikey=09186f978ec0616e9dba9c4ac4b0c4bb"
      ).then((response)=>{
          return response.json()
      }).then((data)=>{
          console.log(data);
      });*/

    return data.data.results;
  }

  document.addEventListener("DOMContentLoaded", () => {
    getCharacters().then((characters) => {
      console.log(characters);
    });
  });
})();
