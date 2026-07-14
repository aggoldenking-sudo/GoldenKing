function cargarHistorial(){


let historial =
JSON.parse(
localStorage.getItem("goldenking_historial")
) || [];



let tabla =
document.getElementById("tablaHistorial");


tabla.innerHTML="";



historial.reverse().forEach(ticket=>{


tabla.innerHTML += `

<tr>

<td>
${ticket.id}
</td>


<td>
${ticket.fecha}
</td>


<td>
Bs. ${ticket.total}
</td>


<td>

<button onclick="verTicket(${ticket.id})">
Ver
</button>

</td>


</tr>

`;

});


}




function verTicket(id){


let historial =
JSON.parse(
localStorage.getItem("goldenking_historial")
) || [];



let ticket =
historial.find(t=>t.id===id);



let texto="";


ticket.jugadas.forEach(j=>{


texto +=

j.id+" "+
j.nombre+
"  Bs."+j.monto+
"  "+j.hora+
"\n";


});



alert(

"🎟️ TICKET\n\n"+
texto+
"\nTOTAL: Bs."+ticket.total

);


}






function borrarHistorial(){


if(confirm("¿Eliminar todo el historial?")){


localStorage.removeItem(
"goldenking_historial"
);


cargarHistorial();


}


}





window.onload=function(){

cargarHistorial();

};
