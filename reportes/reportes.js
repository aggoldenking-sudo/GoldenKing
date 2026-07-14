let ventas =
JSON.parse(localStorage.getItem("jugadas")) || [];



function cargarReporte(){


let total=0;



let tabla =
document.getElementById("tablaReporte");


tabla.innerHTML="";



ventas.forEach(j=>{


total += Number(j.monto);



tabla.innerHTML += `

<tr>

<td>${j.hora || ""}</td>

<td>${j.loteria || ""}</td>

<td>${j.numero || ""}</td>

<td>${j.animal || ""}</td>

<td>${j.monto} Bs</td>

</tr>

`;


});




document.getElementById("ventas").innerHTML =
total.toFixed(2)+" Bs";



document.getElementById("tickets").innerHTML =
ventas.length;



document.getElementById("jugadas").innerHTML =
ventas.length;



document.getElementById("ganancia").innerHTML =
(total*0.20).toFixed(2)+" Bs";



document.getElementById("cierreVenta").innerHTML =
total.toFixed(2)+" Bs";



document.getElementById("cajaFinal").innerHTML =
(total*1).toFixed(2)+" Bs";



}



document
.getElementById("buscar")
.onclick=function(){

cargarReporte();

};



cargarReporte();
