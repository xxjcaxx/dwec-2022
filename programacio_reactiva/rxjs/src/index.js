import { of } from 'rxjs';
import { map } from 'rxjs/operators';


import {fromEvent} from 'rxjs';

document.addEventListener('DOMContentLoaded',()=>{
    const button = document.querySelector('#miBoton');
    const miObservable = fromEvent(button,'click');
    const subscription = miObservable.subscribe(event => console.log(event,'1'));
    const subscription2 = miObservable.subscribe(event => console.log(event,'2'));
});

