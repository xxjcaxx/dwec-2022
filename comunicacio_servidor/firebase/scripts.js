(() => {
  document.addEventListener("DOMContentLoaded", () => {
    let resultats = document.querySelector("#resultats");
    // Enviar registre d'usuaris
    document
      .querySelector("#formRegistre")
      .addEventListener("submit", function (event) {
        // Primer a formData, despres a objecte i despres a JSON
        // fromEntries funciona perquè formData és un iterable
        let datosFormData = new FormData(this);
        let objecteFormData = Object.fromEntries(datosFormData);
        objecteFormData.returnSecureToken = true;
        delete objecteFormData.remember;
        let datos = JSON.stringify(objecteFormData);
        console.log(datos);
        event.preventDefault();
        //console.log(this);
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU",
          {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: datos,
          }
        )
          .then((response) => response.json())
          .then((datos) => {
            resultats.innerHTML = JSON.stringify(datos);
            console.log(datos);
          })
          .catch(error=>{
            console.log('Error;',error);
            resultats.innerHTML = error;
          });
      });


      /// Login  //////////////

      
    document
      .querySelector("#formLogin")
      .addEventListener("submit", function (event) {
        // Primer a formData, despres a objecte i despres a JSON
        // fromEntries funciona perquè formData és un iterable
        let datosFormData = new FormData(this);
        let objecteFormData = Object.fromEntries(datosFormData);
        objecteFormData.returnSecureToken = true;
        delete objecteFormData.remember;
        let datos = JSON.stringify(objecteFormData);
        console.log(datos);
        event.preventDefault();
        //console.log(this);
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACuNiwMT6WhLvr9G6HbMVhV4LfNFnAKzU",
          {
            method: "post",
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
            body: datos,
          }
        )
          .then((response) => response.json())
          .then((datos) => {
            resultats.innerHTML = JSON.stringify(datos);
            localStorage.setItem('idToken',datos.idToken)
            console.log(datos);
          })
          .catch(error=>{
            console.log('Error;',error);
            resultats.innerHTML = error;
          });
      });

      document.querySelector('#obtindre').addEventListener('click',()=>{
        fetch("https://dwec-daw-default-rtdb.firebaseio.com/productos.json")
        .then(response => { return response.json();})
        .then(data =>  resultats.innerHTML = JSON.stringify(data));
      });


  });  //del load
})();
