/**
 * Proyecto Golden King
 * Archivo: sistema/ticket/whatsapp.js
 * Envío de tickets por WhatsApp
 */


window.TicketWhatsApp = (function(){

"use strict";



function prepararMensaje(ticket){


let mensaje = "";



mensaje += "👑 *GOLDEN KING*\n";
mensaje += "AGENCIA DE APUESTAS\n";

mensaje += "====================\n\n";


mensaje +=

"🎫 Ticket: "
+
ticket.ticket
+
"\n";


mensaje +=

"📅 Fecha: "
+
ticket.fecha
+
"\n";


if(ticket.hora){

mensaje +=

"⏰ Hora: "
+
ticket.hora
+
"\n";

}


mensaje += "\n";



mensaje += ticket.texto;



mensaje += "\n\n🍀 Gracias por su preferencia";



return mensaje;



}







return {



enviar(ticket,telefono){



if(!ticket){

alert("No existe ticket");

return;

}




let mensaje =

prepararMensaje(ticket);





let numero =

telefono
?
telefono.replace(/\D/g,"")
:
"";





let url =


"https://wa.me/"

+

numero

+

"?text="

+

encodeURIComponent(mensaje);






window.open(

url,

"_blank"

);



},







generarMensaje(ticket){


return prepararMensaje(ticket);


}



};



})();
