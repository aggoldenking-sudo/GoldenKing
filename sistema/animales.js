/*
=====================================================
 GOLDEN KING
 DATOS DE ANIMALITOS
 animales.js
=====================================================
*/


const animales38 = {

"00":"🐳 Ballena",
"0":"🐬 Delfín",
"01":"🐏 Carnero",
"02":"🐂 Toro",
"03":"🐛 Ciempiés",
"04":"🦂 Alacrán",
"05":"🦁 León",
"06":"🐸 Rana",
"07":"🦜 Perico",
"08":"🐁 Ratón",
"09":"🦅 Águila",
"10":"🐯 Tigre",
"11":"🐱 Gato",
"12":"🐎 Caballo",
"13":"🐒 Mono",
"14":"🕊️ Paloma",
"15":"🦊 Zorro",
"16":"🐻 Oso",
"17":"🦃 Pavo",
"18":"🫏 Burro",
"19":"🐐 Chivo",
"20":"🐷 Cochino",
"21":"🐓 Gallo",
"22":"🐪 Camello",
"23":"🦓 Cebra",
"24":"🦎 Iguana",
"25":"🐔 Gallina",
"26":"🐄 Vaca",
"27":"🐕 Perro",
"28":"🦅 Zamuro",
"29":"🐘 Elefante",
"30":"🐊 Caimán",
"31":"🦫 Lapa",
"32":"🐿️ Ardilla",
"33":"🐟 Pescado",
"34":"🦌 Venado",
"35":"🦒 Jirafa",
"36":"🐍 Culebra"

};





window.DATA_LOTERIAS={


LottoActivo: animales38,


Granjita: animales38,


SelvaPlus: animales38,



Guacharo:{


...animales38,


"37":"🐢 Tortuga",
"38":"🐃 Búfalo",
"39":"🦉 Lechuza",
"40":"🐝 Avispa",
"41":"🦘 Canguro",
"42":"🦜 Tucán",
"43":"🦋 Mariposa",
"44":"🦫 Chigüire",
"45":"🦩 Garza",
"46":"🐆 Puma",
"47":"🦚 Pavo Real",
"48":"🦔 Puercoespín",
"49":"🦥 Pereza",
"50":"🐤 Canario",
"51":"🦆 Pelícano",
"52":"🐙 Pulpo",
"53":"🐌 Caracol",
"54":"🦗 Grillo",
"55":"🦣 Oso Hormiguero",
"56":"🦈 Tiburón",
"57":"🦆 Pato",
"58":"🐜 Hormiga",
"59":"🐆 Pantera",
"60":"🦎 Camaleón",
"61":"🐼 Panda",
"62":"🐗 Cachicamo",
"63":"🦀 Cangrejo",
"64":"🦅 Gavilán",
"65":"🕷️ Araña",
"66":"🐺 Lobo",
"67":"🦤 Avestruz",
"68":"🐆 Jaguar",
"69":"🐇 Conejo",
"70":"🦬 Bisonte",
"71":"🦜 Guacamaya",
"72":"🦍 Gorila",
"73":"🦛 Hipopótamo",
"74":"🐦 Turpial",
"75":"🦇 Guácharo"


}


};







/*
=====================================================
 CONFIGURACIÓN DE SORTEOS
 LOTERIA + HORARIO
=====================================================
*/


window.SORTEOS=[];



const nombresLoterias={


LottoActivo:"LOTTO ACTIVO",

Granjita:"LA GRANJITA",

SelvaPlus:"SELVA PLUS",

Guacharo:"GUÁCHARO"


};





Object.keys(nombresLoterias)

.forEach(loteria=>{


HORARIOS.forEach(hora=>{


SORTEOS.push({


id:
loteria+"_"+hora,


loteria:loteria,


nombre:
nombresLoterias[loteria],


hora:hora,


titulo:
nombresLoterias[loteria]
+
" "
+
hora



});



});


});







/*
=====================================================
 HORARIOS GENERALES
 8:00 AM - 7:00 PM
=====================================================
*/


window.HORARIOS=[


"8:00 AM",
"9:00 AM",
"10:00 AM",
"11:00 AM",
"12:00 PM",
"1:00 PM",
"2:00 PM",
"3:00 PM",
"4:00 PM",
"5:00 PM",
"6:00 PM",
"7:00 PM"


];




console.log(
"DATA LOTERIAS Y SORTEOS CARGADOS"
);
