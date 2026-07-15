/*
=====================================================
 GOLDEN KING
 TAQUILLA NUEVA
 sistema.js
=====================================================
*/


window.Taquilla = {



init(){


console.log("Golden King iniciado");



this.reloj();


this.cargarSorteos();


this.mostrarAnimales();


this.mostrarHorarios();


this.eventos();



},







/*
=========================
 RELOJ
=========================
*/


reloj(){


const hora =
document.getElementById("hora");



if(!hora)
return;



setInterval(()=>{


hora.textContent =
new Date()
.toLocaleTimeString();


},1000);



},







/*
=========================
 SORTEOS
=========================
*/


cargarSorteos(){



const caja =
document.getElementById("sorteos");



if(!caja)
return;



if(!window.LOTTO_ACTIVO_HORARIOS){


caja.innerHTML =
"❌ No hay horarios cargados";


return;


}





caja.innerHTML="";





LOTTO_ACTIVO_HORARIOS.forEach(hora=>{


caja.innerHTML += `


<button class="btn-sorteo">


LOTTO ACTIVO

<br>

🕒 ${hora}


</button>


`;



});




},









/*
=========================
 ANIMALES
=========================
*/


mostrarAnimales(){



const caja =
document.getElementById("animales");



if(!caja)
return;



if(!window.LOTTO_ACTIVO_ANIMALES){


caja.innerHTML=
"❌ No hay animales";


return;


}





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




caja.innerHTML=html;



},










/*
=========================
 HORARIOS
=========================
*/


mostrarHorarios(){



const caja =
document.getElementById("horarios");



if(!caja)
return;



if(!window.LOTTO_ACTIVO_HORARIOS){


caja.innerHTML=
"❌ No hay horarios";


return;


}





let html="";




LOTTO_ACTIVO_HORARIOS.forEach(hora=>{


html += `


<div class="horario-item">

🕒 ${hora}

</div>


`;



});




caja.innerHTML=html;



},









/*
=========================
 BUSCAR ANIMAL
=========================
*/


eventos(){



const numero =
document.getElementById("numero");



if(numero){


numero.addEventListener(
"input",
()=>{


let valor =
numero.value;



let resultado =
document.getElementById("animal");




if(
window.LOTTO_ACTIVO_ANIMALES &&
LOTTO_ACTIVO_ANIMALES[valor]
){


resultado.innerHTML =
LOTTO_ACTIVO_ANIMALES[valor];


}else{


resultado.innerHTML =
"❌ Número no encontrado";


}




});



}



}




};







document.addEventListener(
"DOMContentLoaded",
()=>{


Taquilla.init();


});
