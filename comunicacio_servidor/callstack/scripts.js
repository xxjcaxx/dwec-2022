(function autoinvocada(){

    function mostrarConsola(msg){
        console.log(msg);
    }

    document.addEventListener("DOMContentLoaded",  function load()  {
        let button = document.querySelector('#button');
        button.addEventListener('click',function click(){
            mostrarConsola('click');
        });
    });

   

})();