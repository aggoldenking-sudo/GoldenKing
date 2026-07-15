/*
=====================================================
 GOLDEN KING
 LOTTO ACTIVO
 CONFIGURACION GENERAL
 sistema/datos/LottoActivo/configuracion.js
=====================================================
*/


window.LOTTO_ACTIVO_CONFIG = {


    nombre:

    "LOTTO ACTIVO",



    activo:

    true,



    moneda:

    "Bs",



    minimoApuesta:{


        jugadaNormal:

        50,


        tripletas:

        100


    },



    pagos:{


        jugadaNormal:{

            nombre:
            "Jugada Normal",

            multiplicador:
            30

        },



        tripletas:{

            nombre:
            "Tripletas",

            multiplicador:
            50

        }



    },



    horarioVenta:{


        apertura:

        "7:30 AM",


        cierre:

        "9:00 PM"


    }



};



console.log(
"Configuración Lotto Activo cargada",
window.LOTTO_ACTIVO_CONFIG
);
