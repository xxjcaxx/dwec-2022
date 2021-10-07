(() => {

    app = {};

    function renderCities(cities, ctx) {
        app.cities = cities;
        for (let c of cities) {
            // console.log(c);
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fillRect(c.position_x * 20, c.position_y * 20, 10, 10);
        }
    }

    function renderRoads(roads, ctx) {
        //console.log(roads);
        for (let r of roads) {
            let city1 = r.city_1;
            let city2 = r.city_2;
            city1 = app.cities.find(c => c.id === city1[0])
            city2 = app.cities.find(c => c.id === city2[0])
            // console.log(city1, city2);
            ctx.beginPath();
            ctx.moveTo(city1.position_x*20, city1.position_y*20);
            ctx.lineTo(city2.position_x*20, city2.position_y*20);
            ctx.stroke();
        }
    }


    document.addEventListener("DOMContentLoaded", function () {
        let canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;
        document.querySelector('#map').append(canvas);
        let ctx = canvas.getContext('2d');

        function json(response) { return response.json() }
        let fetchOptions = {
            method: 'get',

        };
        fetch('http://192.168.88.16:8069/negocity/api/city', fetchOptions)
            .then(json).then(
                cities => {
                    renderCities(cities, ctx);
                }
            )
            .then(() => {
                return fetch('http://192.168.88.16:8069/negocity/api/road', fetchOptions);
            }).then(json).then(
                roads => renderRoads(roads, ctx)
            );

    });
})();