
    let data = {
        numero: 20,
        setData(n) {
            console.log(n);
            this.numero = n;
            document.querySelector('#numero').value = this.numero;
            document.querySelector('#doble').value = this.numero*2;
        }
    }



document.addEventListener("DOMContentLoaded", () => {


    data.setData(30);

    document.querySelector('#numero').addEventListener('keyup',function(){
       // console.log('keyup');
        data.setData(this.value);
    })



});