window.App = {


ticket: [],

seleccionados: [],
  
  codigoPendiente: null,



init(){


this.cargarTicket();


this.renderMatriz();


this.renderTicket();


},




renderMatriz(){


const contenedor =
document.getElementById("matrizAnimalitos");



const tipo =
document.getElementById("loteriaSelect").value;



const items =
window.DATA_LOTERIAS[tipo];



if(!items){

console.error("No existen datos");

return;

}



contenedor.innerHTML="";



Object.keys(items)

.sort((a,b)=>{


if(a==="00") return -1;

if(b==="00") return 1;


if(a==="0") return -1;

if(b==="0") return 1;


return Number(a)-Number(b);


})


.forEach(id=>{


let btn=document.createElement("button");


btn.className="btn-animal";


btn.innerHTML=

`<strong>${id}</strong><br>${items[id]}`;



btn.onclick=()=>{


if(this.seleccionados.includes(id)){


this.seleccionados =

this.seleccionados.filter(x=>x!==id);


btn.classList.remove("seleccionado");


}else{


this.seleccionados.push(id);


btn.classList.add("seleccionado");


}


};



contenedor.appendChild(btn);



});


},






agregarSeleccion(){



const monto =

Number(document.getElementById("montoInput").value);



const hora =

document.getElementById("horarioSelect").value;



const loteria =

document.getElementById("loteriaSelect").value;




this.seleccionados.forEach(id=>{


let existe=this.ticket.find(t=>


t.id===id &&

t.hora===hora &&

t.loteria===loteria


);



if(existe){


existe.monto += monto;


}else{


this.ticket.push({


id:id,


nombre:
window.DATA_LOTERIAS[loteria][id],


monto:monto,


hora:hora,


loteria:loteria


});


}


});



this.seleccionados=[];


this.guardarTicket();


this.renderMatriz();


this.renderTicket();


},






agregarCodigoRapido(codigo){


const loteria=

document.getElementById("loteriaSelect").value;



if(!window.DATA_LOTERIAS[loteria][codigo]){


alert("Código inválido");

return;

}



const monto=

Number(document.getElementById("montoInput").value);



const hora=

document.getElementById("horarioSelect").value;



let existe=this.ticket.find(t=>

t.id===codigo &&

t.hora===hora &&

t.loteria===loteria

);



if(existe){


existe.monto += monto;


}else{


this.ticket.push({


id:codigo,


nombre:
window.DATA_LOTERIAS[loteria][codigo],


monto:monto,


hora:hora,


loteria:loteria


});


}



this.guardarTicket();

this.renderTicket();


},






renderTicket(){


const tbody=document.querySelector("#ticketTable tbody");


tbody.innerHTML=this.ticket.map((t,i)=>`


<tr>

<td>${t.id} ${t.nombre}</td>

<td>${t.hora}</td>

<td>${t.monto}</td>

<td>

<button onclick="window.App.remover(${i})">

X

</button>

</td>

</tr>


`).join("");




let total=this.ticket.reduce(

(a,b)=>a+b.monto,

0

);



document.getElementById("totalDisplay").innerText=

"Total: Bs. "+total;



},






remover(i){


this.ticket.splice(i,1);


this.guardarTicket();


this.renderTicket();


},






limpiarTodo(){


this.ticket=[];


this.seleccionados=[];


this.guardarTicket();


this.renderTicket();


this.renderMatriz();


},






guardarTicket(){


localStorage.setItem(

"goldenking_ticket",

JSON.stringify(this.ticket)

);


},






cargarTicket(){


let datos=

localStorage.getItem(

"goldenking_ticket"

);



if(datos){

this.ticket=JSON.parse(datos);

}


},






imprimirTicket(){


let total=this.ticket.reduce(

(a,b)=>a+b.monto,

0

);


window.Impresion.generarTicket(

this.ticket,

total

);


this.ticket=[];


this.guardarTicket();


this.renderTicket();


}



};





window.onload=()=>{


window.App.init();


};





document.addEventListener("keydown",(e)=>{

    if(e.key !== "Enter") return;

    const campo = document.activeElement;

    // ENTER EN CÓDIGO
    if(campo.id==="codigoAnimal"){

        e.preventDefault();

        const codigo = campo.value.trim();

        if(codigo==="") return;

        window.App.agregarCodigoRapido(codigo);

        return;

    }

    // ENTER EN MONTO
    if(campo.id==="montoInput"){

        e.preventDefault();

        if(window.App.codigoPendiente){

            const codigo = window.App.codigoPendiente;

            window.App.codigoPendiente = null;

            const monto = Number(campo.value);

            const hora = document.getElementById("horarioSelect").value;

            const loteria = document.getElementById("loteriaSelect").value;

            let existe = window.App.ticket.find(t=>

                t.id===codigo &&
                t.hora===hora &&
                t.loteria===loteria

            );

            if(existe){

                existe.monto += monto;

            }else{

                window.App.ticket.push({

                    id:codigo,

                    nombre:window.DATA_LOTERIAS[loteria][codigo],

                    monto:monto,

                    hora:hora,

                    loteria:loteria

                });

            }

            window.App.guardarTicket();

            window.App.renderTicket();

            document.getElementById("codigoAnimal").value="";

            document.getElementById("codigoAnimal").focus();

        }

    }

});


if(e.key==="Enter"){


let campo=document.activeElement;


if(campo.id==="codigoAnimal"){


agregarCodigoRapido(codigo){

    const loteria = document.getElementById("loteriaSelect").value;

    if(!window.DATA_LOTERIAS[loteria][codigo]){
        alert("Código inválido");
        return;
    }

    this.codigoPendiente = codigo;

    const monto = document.getElementById("montoInput");

    monto.focus();

    monto.select();

}


}


});
