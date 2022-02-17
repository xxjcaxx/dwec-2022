document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=939408fa9747e9295a3083f4748176e7085150a135d08f3441b972cb176c5af1"
  ).then((teams) => {
    teams.json().then((t) => {
      console.log(t);
      let players = t
        .map((team) =>
          team.players.map((p) => {
            return { id: p.player_id, image: p.player_image };
          })
        )
        .flat();

      console.log(players);
      document.querySelector("#container").innerHTML = players.map(
        (p) => p.image
      );
    });
  });
});
