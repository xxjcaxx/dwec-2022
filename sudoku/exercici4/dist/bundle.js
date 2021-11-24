(()=>{"use strict";var e,n,t,a,r,o,l,s,c,i,d,u,p,f,m={426:(e,n,t)=>{t.d(n,{Z:()=>s});var a=t(81),r=t.n(a),o=t(645),l=t.n(o)()(r());l.push([e.id,'table {\n    border-collapse: collapse;\n}\n\ntable.mal {\n    background-color: #faa;\n}\ntable.bien {\n    background-color: #afa;\n}\n\ntd {\n    width: 50px;\n    height: 50px;\n    padding: 0px;\n    border: 1px solid #000;\n    text-align: center; \n    vertical-align: middle;\n    font-size: 2em;\n    font-family: Arial, Helvetica, sans-serif;\n}\n\ntd span[contenteditable="true"] {\n    background-color: #ddd;\n    display: grid;\n    align-items: center;\n    height: 100%;\n}\n\ntd.mal span{\n    background-color: #f00;\n}\ntd.mal {\n    background-color: #f00;\n}\ntd.regular span{\n    background-color: #fa0;\n}\n\ntd.separador {\n    border-right: 3px solid #000;\n}\ntr.separador {\n    border-bottom: 3px solid #000;\n}\n\n.editable{\n    color: #ccc;\n}\n\n.teclado {\n    position: absolute;\n    width: 80px;\n    height: 110px;\n    background-color: #ddd;\n    border-radius: 5px;\n    border: 2px solid #ccc;\n    display: flex;\n    flex-wrap: wrap;\n}\n.teclado span {\n    display: inline-block;\n    padding: 0 4px 0 4px;\n    font-size: 26px;\n    background-color: #fff;\n    border: 2px solid #ccc;\n    border-radius: 5px;\n    margin: 0px;\n}',""]);const s=l},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",a=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),a&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),a&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,a,r,o){"string"==typeof e&&(e=[[null,e,void 0]]);var l={};if(a)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(l[c]=!0)}for(var i=0;i<e.length;i++){var d=[].concat(e[i]);a&&l[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),r&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=r):d[4]="".concat(r)),n.push(d))}},n}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,a=0;a<n.length;a++)if(n[a].identifier===e){t=a;break}return t}function a(e,a){for(var o={},l=[],s=0;s<e.length;s++){var c=e[s],i=a.base?c[0]+a.base:c[0],d=o[i]||0,u="".concat(i," ").concat(d);o[i]=d+1;var p=t(u),f={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var m=r(f,a);a.byIndex=s,n.splice(s,0,{identifier:u,updater:m,references:1})}l.push(u)}return l}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var o=a(e=e||[],r=r||{});return function(e){e=e||[];for(var l=0;l<o.length;l++){var s=t(o[l]);n[s].references--}for(var c=a(e,r),i=0;i<o.length;i++){var d=t(o[i]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}o=c}}},569:e=>{var n={};e.exports=function(e,t){var a=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var a="";t.supports&&(a+="@supports (".concat(t.supports,") {")),t.media&&(a+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(a+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),a+=t.css,r&&(a+="}"),t.media&&(a+="}"),t.supports&&(a+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(a,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},h={};function v(e){var n=h[e];if(void 0!==n)return n.exports;var t=h[e]={id:e,exports:{}};return m[e](t,t.exports,v),t.exports}v.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return v.d(n,{a:n}),n},v.d=(e,n)=>{for(var t in n)v.o(n,t)&&!v.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})},v.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),e=v(379),n=v.n(e),t=v(795),a=v.n(t),r=v(569),o=v.n(r),l=v(565),s=v.n(l),c=v(216),i=v.n(c),d=v(589),u=v.n(d),p=v(426),(f={}).styleTagTransform=u(),f.setAttributes=s(),f.insert=o().bind(null,"head"),f.domAPI=a(),f.insertStyleElement=i(),n()(p.Z,f),p.Z&&p.Z.locals&&p.Z.locals,(()=>{let e=[2,9,5,6,7,8,1,4,3,6,4,3,9,5,1,8,7,2,8,7,1,3,4,2,5,9,6,7,1,2,5,6,9,3,8,4,3,6,8,7,1,4,9,2,5,4,5,9,8,2,3,6,1,7,9,2,7,1,3,6,4,5,0,5,8,6,4,9,7,2,3,0,1,3,4,2,0,5,7,6,9],n=0;function t(){let n=document.getElementById("sudoku"),t=document.createElement("table");for(let n=0;n<9;n++){let a=document.createElement("tr");2==n|5==n&&(a.className="separador"),t.append(a);for(let t=0;t<9;t++){let r=e[9*n+t],o=document.createElement("td");o.id=`celda-${n}-${t}`,2==t|5==t&&(o.className="separador"),o.innerHTML=`<span>${r>0?r:""}</span>`,0==r&&o.querySelector("span").classList.add("editable"),a.append(o)}}n.append(t)}document.addEventListener("DOMContentLoaded",(function(){fetch("static/coleccionsudokus.json").then((e=>e.json())).then((t=>{let a=Object.keys(t.sudokus),r=[];localStorage.getItem("solucionades")&&(r=localStorage.getItem("solucionades").split(" ")),a=a.filter((e=>-1==r.indexOf(e))),n=a[Math.floor(Math.random()*a.length)],e=t.sudokus[n]})).then(t),document.querySelector("#sudoku").addEventListener("click",(e=>{let t=e.target;if("TD"==t.tagName&&(t=t.querySelector("span")),t.classList.contains("editable")){let e=document.createElement("div");e.innerHTML="<span>1</span>\n        <span>2</span>\n        <span>3</span>\n        <span>4</span>\n        <span>5</span>\n        <span>6</span>\n        <span>7</span>\n        <span>8</span>\n        <span>9</span>\n        ",e.classList.add("teclado"),t.parentElement.append(e),e.addEventListener("click",(a=>{t.innerText=a.target.innerText,e.remove(),function(e){let t=e.parentElement.id.split("-").filter((e=>"celda"!=e)).map((e=>parseInt(e))),a=!0,r=[];document.querySelectorAll("td").forEach((e=>e.className=""));let o=document.querySelectorAll("tr");for(let e=0;e<o.length;e++){let n=o[e].querySelectorAll("span");for(let e=0;e<n.length;e++)r.push(parseInt(n[e].innerText))}for(let n=0;n<9;n++){let o=new Set;for(let e=0;e<9;e++){const t=r[9*n+e];!isNaN(t)&&o.add(t)}9==o.size||(console.warn("Fila no vàlida",{fila:o}),a=!1,n==t[0]&&e.parentElement.parentElement.querySelectorAll("td").forEach((e=>e.classList.add("mal"))))}for(let e=0;e<9;e++){let n=new Set;for(let t=0;t<9;t++){const a=r[9*t+e];!isNaN(a)&&n.add(a)}if(9!=n.size&&(console.warn("columna no vàlida",{columna:n}),a=!1,e==t[1])){let n=new RegExp(`celda-[0-9]-${e}`);[...document.querySelectorAll("td")].filter((e=>n.test(e.id))).forEach((e=>e.classList.add("mal")))}}for(let e=0;e<3;e++)for(let n=0;n<3;n++){let o=new Set;for(let t=0;t<3;t++)for(let a=0;a<3;a++){const l=r[27*e+3*n+9*t+a];!isNaN(l)&&o.add(l)}if(9!=o.size&&(console.warn("quadrat no vàlid",{quadrat:o}),a=!1,e==Math.floor(t[0]/3)&&n==Math.floor(t[1]/3))){let t=3*e,a=3*n,r=[[t,a],[t+1,a],[t+2,a],[t,a+1],[t+1,a+1],[t+2,a+1],[t,a+2],[t+1,a+2],[t+2,a+2]];r=r.map((e=>document.querySelector(`#celda-${e[0]}-${e[1]}`))),r.forEach((e=>e.classList.add("mal")))}}if(0==a)document.querySelector("#sudoku table").classList.add("mal");else if(document.querySelector("#sudoku table").classList.add("bien"),localStorage.getItem("solucionades")){let e=localStorage.getItem("solucionades");e=`${e} ${n}`,localStorage.setItem("solucionades",e)}else localStorage.setItem("solucionades",`${n}`)}(t)}))}}))}))})()})();