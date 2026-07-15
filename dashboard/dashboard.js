/*
====================================================
GOLDEN KING
Dashboard JS
====================================================
*/

window.Dashboard = {

    init() {

        this.reloj();

        this.eventos();

        this.animarTarjetas();

        setInterval(() => {

            this.reloj();

        }, 1000);

    },

    reloj() {

        const hora = document.getElementById("hora");

        if (!hora) return;

        const ahora = new Date();

        hora.textContent = ahora.toLocaleTimeString("es-VE", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

    },

    eventos() {

        document.querySelectorAll(".card").forEach(card => {

            card.addEventListener("click", () => {

                // Tarjeta Salir
                if (card.classList.contains("salir")) {

                    this.salir();

                    return;

                }

                const destino = card.dataset.link;

                if (destino) {

                    window.location.href = destino;

                }

            });

        });

    },

    salir() {

        const ok = confirm("¿Desea cerrar la sesión?");

        if (!ok) return;

        window.location.href = "../login.html";

    },

    animarTarjetas() {

        const cards = document.querySelectorAll(".card");

        cards.forEach((card, index) => {

            card.style.opacity = "0";

            card.style.transform = "translateY(40px)";

            setTimeout(() => {

                card.style.transition = ".45s ease";

                card.style.opacity = "1";

                card.style.transform = "translateY(0)";

            }, index * 80);

        });

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Dashboard.init();

});
