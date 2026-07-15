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


this.generarSorteos();


this.mostrarSorteos();


this.mostrarAnimales();


this.mostrarHorarios();


this.cargarEventos();


this.mostrarTicket();


this.reloj();



setInterval(()=>{

this.reloj();

},1000);



},





/*
===========================
 GENERAR SORTEOS
===========================
*/


generarSorteos(){


window.SORTEOS=[];



if(!window.LOTTO_ACTIVO_HORARIOS)

return;



LOTTO_ACTIVO_HORARIOS.forEach(hora=>{



SORTEOS.push({


id:
"LOTTO_ACTIVO_"+hora,


loteria:
"LOTTO_ACTIVO",


nombre:
"LOTTO ACTIVO",


hora:
hora



});



});



},







/*
===========================
 MOSTRAR SORTEOS
===========================
*/


mostrarSorteos(){



const contenedor =
document.getElementById(
"listaSorteos"
);



if(!contenedor)

return;



contenedor.innerHTML="";





SORTEOS.forEach(sorteo=>{



contenedor.innerHTML += `


<button

class="btn-sorteo"

data-id="${sorteo.id}">


${sorteo.nombre}


<br>


🕒 ${sorteo.hora}


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



let id =
btn.dataset.id;




let existe =
this.sorteosSeleccionados
.find(s=>s.id===id);





if(existe){


this.sorteosSeleccionados =
this.sorteosSeleccionados
.filter(s=>s.id!==id);


btn.classList.remove("activo");



}else{



let sorteo =
SORTEOS.find(
s=>s.id===id
);



this.sorteosSeleccionados.push(
sorteo
);



btn.classList.add("activo");



}



document.getElementById(
"contadorSorteos"
).textContent =


this.sorteosSeleccionados.length+

" sorteos seleccionados";



},







/*
===========================
 ANIMALES
===========================
*/


mostrarAnimales(){



const contenedor =
document.getElementById(
"listaAnimales"
);



if(!contenedor)

return;



let html="";



Object.entries(
LOTTO_ACTIVO_ANIMALES
)

.forEach(([numero,animal])=>{



html += `


<div class="animal-item">


<b>${numero}</b>


<br>


${animal}


</div>


`;



});



contenedor.innerHTML=html;



},









/*
===========================
 HORARIOS
===========================
*/


mostrarHorarios(){


const contenedor =
document.getElementById(
"listaHorarios"
);



if(!contenedor)

return;



let html="";



LOTTO_ACTIVO_HORARIOS.forEach(hora=>{


html+=`


<div class="horario-item">

🕒 ${hora}

</div>


`;



});



contenedor.innerHTML=html;



},







/*
===========================
 EVENTOS
===========================
*/


cargarEventos(){



let numero =
document.getElementById(
"numero"
);



let agregar =
document.getElementById(
"agregar"
);





if(numero){



numero.addEventListener(
"input",
()=>{


this.buscarAnimal();


});



}




if(agregar){



agregar.onclick=()=>{


this.agregarJugada();


};



}




},







/*
===========================
 BUSCAR ANIMAL
===========================
*/


buscarAnimal(){



let numero =
document.getElementById(
"numero"
).value;



let resultado =
document.getElementById(
"animalEncontrado"
);





if(!numero){


resultado.innerHTML="";

return;


}




let animal =
LOTTO_ACTIVO_ANIMALES[numero];




resultado.innerHTML =


animal

?

animal

:

"❌ Número no disponible";



},









/*
===========================
 AGREGAR JUGADA
===========================
*/


agregarJugada(){



let numero =
document.getElementById(
"numero"
).value;



let monto =
Number(
document.getElementById(
"monto"
).value
);





if(this.sorteosSeleccionados.length===0){

alert("Seleccione un sorteo");

return;

}





if(!numero){

alert("Ingrese número");

return;

}




if(!monto){

alert("Ingrese monto");

return;

}





this.sorteosSeleccionados.forEach(sorteo=>{



this.jugadas.push({


loteria:
sorteo.nombre,


hora:
sorteo.hora,


numero,


animal:
LOTTO_ACTIVO_ANIMALES[numero],


monto



});



});




this.mostrarTicket();


this.limpiar();



},







/*
===========================
 TICKET
===========================
*/


mostrarTicket(){



let contenedor =
document.getElementById(
"ticket"
);


let total =
document.getElementById(
"total"
);



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



suma += j.monto;




html+=`


<div class="fila-ticket">


<b>${j.loteria}</b>


<br>


🕒 ${j.hora}


<br>


${j.numero}

${j.animal}



<br>


💰 ${j.monto} Bs



<button onclick="Taquilla.eliminar(${index})">

❌

</button>



</div>


`;



});



contenedor.innerHTML=html;



total.textContent =
suma.toFixed(2);



},







eliminar(index){


this.jugadas.splice(index,1);


this.mostrarTicket();


},







limpiar(){


document.getElementById(
"numero"
).value="";


document.getElementById(
"monto"
).value="";


document.getElementById(
"animalEncontrado"
).innerHTML="";


},









reloj(){


let hora =
document.getElementById(
"hora"
);



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
