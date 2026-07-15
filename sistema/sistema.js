/*
=====================================================
 GOLDEN KING
 SISTEMA DE TAQUILLA
 sistema.js
=====================================================
*/


window.Taquilla = {


jugadas: [],

sorteosSeleccionados: [],



init(){


this.cargarSorteos();

this.mostrarAnimales();

this.mostrarHorarios();

this.cargarEventos();

this.conectarTicket();

this.mostrarTicket();

this.reloj();


setInterval(()=>{

this.reloj();

},1000);



},






/* ==========================
   SORTEOS
========================== */


cargarSorteos(){


const contenedor =
document.getElementById("listaSorteos");


if(!contenedor || !window.SORTEOS)
return;



contenedor.innerHTML="";



SORTEOS.forEach(sorteo=>{


contenedor.innerHTML += `


<button class="btn-sorteo"
data-id="${sorteo.id}">


${sorteo.nombre}

<br>

<b>${sorteo.hora}</b>


</button>


`;



});




document
.querySelectorAll(".btn-sorteo")
.forEach(btn=>{


btn.onclick=()=>{


this.seleccionarSorteo(btn);


};



});



},







seleccionarSorteo(btn){


const id =
btn.dataset.id;



const existe =
this.sorteosSeleccionados
.find(s=>s.id===id);



if(existe){


this.sorteosSeleccionados =
this.sorteosSeleccionados
.filter(s=>s.id!==id);



btn.classList.remove("activo");



}else{


const sorteo =
SORTEOS.find(
s=>s.id===id
);



this.sorteosSeleccionados.push(sorteo);



btn.classList.add("activo");



}




const contador =
document.getElementById(
"contadorSorteos"
);



if(contador){

contador.textContent =
this.sorteosSeleccionados.length
+
" sorteos seleccionados";

}



},







/* ==========================
   MOSTRAR ANIMALES
========================== */


mostrarAnimales(){


const contenedor =
document.getElementById("listaAnimales");


if(!contenedor || !window.DATA_LOTERIAS)
return;



let animales =
DATA_LOTERIAS.Guacharo;



let html="";



Object.entries(animales)

.forEach(([numero,nombre])=>{


html += `


<div class="animal-item">


<b>${numero}</b>


<br>


${nombre}


</div>


`;



});



contenedor.innerHTML=html;



},








/* ==========================
   HORARIOS
========================== */


mostrarHorarios(){


const contenedor =
document.getElementById("listaHorarios");



if(!contenedor || !window.HORARIOS)
return;



let html="";



HORARIOS.forEach(hora=>{


html += `


<div class="horario-item">


🕒 ${hora}


</div>


`;



});



contenedor.innerHTML=html;



},








/* ==========================
   EVENTOS
========================== */


cargarEventos(){



const numero =
document.getElementById("numero");



const agregar =
document.getElementById("agregar");





if(numero){


numero.addEventListener(
"input",
()=>{

this.buscarAnimal();

}

);


}






if(agregar){


agregar.onclick=()=>{


this.agregarJugada();


};



}



},








/* ==========================
   BUSCAR ANIMAL
========================== */


buscarAnimal(){



let numero =
document
.getElementById("numero")
.value;



let resultado =
document.getElementById(
"animalEncontrado"
);




if(!numero){

resultado.innerHTML="";

return;

}




let animal="";



Object.values(DATA_LOTERIAS)

.forEach(lista=>{


if(lista[numero]){


animal=lista[numero];


}


});




resultado.innerHTML =

animal

?

animal

:

"❌ Número no disponible";



},







/* ==========================
   AGREGAR JUGADA
========================== */


agregarJugada(){



let numero =
document.getElementById("numero")
.value;



let monto =
Number(
document.getElementById("monto")
.value
);




if(this.sorteosSeleccionados.length===0){

alert("Seleccione un sorteo");

return;

}



if(!numero){

alert("Ingrese número");

return;

}



if(!monto || monto<=0){

alert("Ingrese monto");

return;

}




this.sorteosSeleccionados

.forEach(sorteo=>{


let animal =
DATA_LOTERIAS
[sorteo.loteria]
[numero]
||
"Sin animal";



this.jugadas.push({


loteria:sorteo.nombre,

hora:sorteo.hora,

numero,

animal,

monto



});



});




this.mostrarTicket();


this.limpiar();



},









/* ==========================
   TICKET
========================== */


mostrarTicket(){



let contenedor =
document.getElementById("ticket");



let total =
document.getElementById("total");



if(!contenedor)
return;



if(this.jugadas.length===0){


contenedor.innerHTML=

`
<p class="vacio">
No hay jugadas
</p>
`;



total.textContent="0.00";


return;


}



let html="";

let suma=0;



this.jugadas.forEach((j,index)=>{


suma+=j.monto;



html+=`


<div class="fila-ticket">


<b>${j.loteria}</b>

<br>

🕒 ${j.hora}

<br>

${j.numero}

${j.animal}


<strong>

${j.monto} Bs

</strong>


<button onclick="Taquilla.eliminar(${index})">

❌

</button>


</div>


`;



});



contenedor.innerHTML=html;


total.textContent=
suma.toFixed(2);



},








eliminar(index){


this.jugadas.splice(index,1);


this.mostrarTicket();



},







limpiar(){


document.getElementById("numero").value="";


document.getElementById("monto").value="";


document.getElementById("animalEncontrado").innerHTML="";



},








/* ==========================
   RELOJ
========================== */


reloj(){


let hora =
document.getElementById("hora");



if(hora){


hora.textContent =
new Date()
.toLocaleTimeString();


}



}






};






document.addEventListener(
"DOMContentLoaded",
()=>{


Taquilla.init();


});
