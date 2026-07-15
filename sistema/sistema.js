/*
=====================================================
 GOLDEN KING POS
 SISTEMA DE TAQUILLA
 sistema.js - Versión Mejorada
=====================================================
*/

const Taquilla = {
	// ===== DATOS Y CONFIGURACIÓN =====
	jugadas: [],

	animales: {
		"00": "🐳 Ballena",
		"01": "🐏 Carnero",
		"02": "🐂 Toro",
		"03": "🐛 Ciempiés",
		"04": "🦂 Alacrán",
		"05": "🦁 León",
		"06": "🐸 Rana",
		"07": "🦜 Perico",
		"08": "🐭 Ratón",
		"09": "🐰 Conejo",

		"10": "🐯 Tigre",
		"11": "🐱 Gato",
		"12": "🐴 Caballo",
		"13": "🐓 Gallo",
		"14": "🐷 Cerdo",
		"15": "🦊 Zorro",
		"16": "🐻 Oso",
		"17": "🦌 Venado",
		"18": "🐐 Chivo",
		"19": "🐟 Pescado",

		"20": "🐊 Caimán",
		"21": "🐕 Perro",
		"22": "🦋 Mariposa",
		"23": "🐼 Panda",
		"24": "🦅 Águila",
		"25": "🐢 Tortuga",
		"26": "🐘 Elefante",
		"27": "🐒 Mono",
		"28": "🐓 Pavo",
		"29": "🐍 Culebra",

		"30": "🐎 Burro",
		"31": "🐺 Lobo",
		"32": "🦉 Lechuza",
		"33": "🦀 Cangrejo",
		"34": "🐝 Abeja",
		"35": "🐄 Vaca",
		"36": "🐋 Delfín",
		"37": "🦓 Cebra",
		"38": "🦈 Tiburón"
	},

	// ===== LOTERIAS VÁLIDAS =====
	loterias: ["Lotto Activo", "La Granjita"],

	// ===== CONSTANTES =====
	ANIMAL_NOT_FOUND: "🐾 Número no válido",
	DEFAULT_ANIMAL: "🐾 Animal",
	EMPTY_TICKET_MESSAGE: "Sin jugadas",
	MIN_AMOUNT: 0.01,

	// ===== ELEMENTOS DEL DOM (CACHEADOS) =====
	elementos: {},

	// ===== INICIALIZACIÓN =====
	init() {
		try {
			this.cachearElementos();
			this.agregarEventos();
		} catch (error) {
			console.error("Error al inicializar Taquilla:", error);
			alert("❌ Error al cargar el sistema. Recarga la página.");
		}
	},

	// ===== CACHEAR ELEMENTOS DEL DOM =====
	cachearElementos() {
		this.elementos = {
			numero: document.getElementById("numero"),
			animal: document.getElementById("animal"),
			loteria: document.getElementById("loteria"),
			monto: document.getElementById("monto"),
			ticket: document.getElementById("ticket"),
			total: document.getElementById("total"),
			agregar: document.getElementById("agregar"),
			limpiar: document.getElementById("limpiar"),
			imprimir: document.getElementById("imprimir")
		};

		// Validar que existan todos los elementos
		Object.entries(this.elementos).forEach(([key, elemento]) => {
			if (!elemento) {
				throw new Error(`Elemento #${key} no encontrado en el HTML`);
			}
		});
	},

	// ===== AGREGAR EVENTOS =====
	agregarEventos() {
		// Evento: Mostrar animal al escribir número
		this.elementos.numero.addEventListener("input", () => {
			this.mostrarAnimal();
		});

		// Evento: Agregar jugada
		this.elementos.agregar.addEventListener("click", () => {
			this.agregarJugada();
		});

		// Evento: Permitir Enter para agregar jugada
		this.elementos.monto.addEventListener("keypress", (e) => {
			if (e.key === "Enter") {
				this.agregarJugada();
			}
		});

		// Evento: Limpiar ticket
		this.elementos.limpiar.addEventListener("click", () => {
			this.limpiar();
		});

		// Evento: Imprimir ticket
		this.elementos.imprimir.addEventListener("click", () => {
			this.imprimir();
		});

		// Evento: Validar número en tiempo real
		this.elementos.numero.addEventListener("blur", () => {
			if (this.elementos.numero.value && !this.animales[this.elementos.numero.value]) {
				this.elementos.numero.value = "";
				this.mostrarAnimal();
			}
		});

		// Inicializar ticket
		this.actualizarTicket();
	},

	// ===== MOSTRAR ANIMAL SEGÚN NÚMERO =====
	mostrarAnimal() {
		const numero = this.elementos.numero.value.padStart(2, "0");
		const animal = this.animales[numero];

		this.elementos.animal.innerHTML = animal || this.ANIMAL_NOT_FOUND;
	},

	// ===== AGREGAR JUGADA =====
	agregarJugada() {
		// Obtener valores del formulario
		const loteria = this.elementos.loteria.value;
		const numero = this.elementos.numero.value.padStart(2, "0");
		const monto = parseFloat(this.elementos.monto.value);

		// Validaciones
		if (!this.validar(numero, monto, loteria)) {
			return;
		}

		// Agregar jugada al array
		this.jugadas.push({
			id: Date.now(), // Identificador único para eliminar
			loteria,
			numero,
			animal: this.animales[numero],
			monto: parseFloat(monto.toFixed(2))
		});

		// Actualizar interfaz
		this.actualizarTicket();
		this.limpiarFormulario();
	},

	// ===== VALIDAR DATOS =====
	validar(numero, monto, loteria) {
		// Validar número
		if (!this.animales[numero]) {
			alert("❌ Seleccione un número válido (00-38)");
			this.elementos.numero.focus();
			return false;
		}

		// Validar monto
		if (!monto || monto < this.MIN_AMOUNT) {
			alert("❌ Ingrese un monto válido (mayor a 0)");
			this.elementos.monto.focus();
			return false;
		}

		// Validar lotería
		if (!this.loterias.includes(loteria)) {
			alert("❌ Seleccione una lotería válida");
			this.elementos.loteria.focus();
			return false;
		}

		return true;
	},

	// ===== LIMPIAR FORMULARIO =====
	limpiarFormulario() {
		this.elementos.numero.value = "";
		this.elementos.monto.value = "";
		this.elementos.animal.innerHTML = this.DEFAULT_ANIMAL;
		this.elementos.numero.focus();
	},

	// ===== ACTUALIZAR TICKET =====
	actualizarTicket() {
		const contenedor = this.elementos.ticket;

		// Si no hay jugadas
		if (this.jugadas.length === 0) {
			contenedor.innerHTML = this.EMPTY_TICKET_MESSAGE;
			this.elementos.total.innerHTML = "0";
			return;
		}

		// Generar HTML de jugadas
		const html = this.jugadas
			.map((jugada, index) => this.generarJugadaHTML(jugada, index))
			.join("");

		contenedor.innerHTML = html;

		// Calcular y mostrar total
		const total = this.calcularTotal();
		this.elementos.total.innerHTML = total.toFixed(2);

		// Agregar eventos a botones de eliminar
		this.agregarEventosEliminar();
	},

	// ===== GENERAR HTML DE UNA JUGADA =====
	generarJugadaHTML(jugada, index) {
		return `
			<div class="jugada" data-id="${jugada.id}">
				<div class="jugada-content">
					<strong>${jugada.numero} ${jugada.animal}</strong>
					<small>${jugada.loteria}</small>
					<small>Monto: ${jugada.monto.toFixed(2)} Bs</small>
				</div>
				<button class="btn-eliminar" data-index="${index}" type="button" title="Eliminar esta jugada">
					❌
				</button>
			</div>
		`;
	},

	// ===== AGREGAR EVENTOS A BOTONES ELIMINAR =====
	agregarEventosEliminar() {
		document.querySelectorAll(".btn-eliminar").forEach((btn) => {
			btn.addEventListener("click", (e) => {
				const index = parseInt(e.target.dataset.index);
				this.eliminarJugada(index);
			});
		});
	},

	// ===== ELIMINAR JUGADA =====
	eliminarJugada(index) {
		this.jugadas.splice(index, 1);
		this.actualizarTicket();
	},

	// ===== CALCULAR TOTAL =====
	calcularTotal() {
		return this.jugadas.reduce((suma, jugada) => suma + jugada.monto, 0);
	},

	// ===== LIMPIAR TICKET COMPLETO =====
	limpiar() {
		if (this.jugadas.length === 0) {
			alert("ℹ️ El ticket ya está vacío");
			return;
		}

		if (confirm("¿Estás seguro de que deseas limpiar todo el ticket?")) {
			this.jugadas = [];
			this.actualizarTicket();
		}
	},

	// ===== IMPRIMIR TICKET =====
	imprimir() {
		if (this.jugadas.length === 0) {
			alert("⚠️ No hay jugadas para imprimir");
			return;
		}

		const total = this.calcularTotal();
		const fecha = new Date().toLocaleString("es-VE");

		let contenidoImpresion = `
==================================
   GOLDEN KING POS - TAQUILLA
==================================

Fecha: ${fecha}

------ JUGADAS ------
		`;

		this.jugadas.forEach((jugada, index) => {
			contenidoImpresion += `
${index + 1}. ${jugada.numero} ${jugada.animal}
   Lotería: ${jugada.loteria}
   Monto: ${jugada.monto.toFixed(2)} Bs
			`;
		});

		contenidoImpresion += `

------ TOTAL ------
Total: ${total.toFixed(2)} Bs

==================================
		`;

		// Abrir ventana de impresión
		const ventana = window.open("", "_blank");
		ventana.document.write(`
			<html>
			<head>
				<title>TICKET - Golden King POS</title>
				<style>
					body { font-family: monospace; font-size: 12px; margin: 20px; }
					pre { white-space: pre-wrap; word-wrap: break-word; }
				</style>
			</head>
			<body>
				<pre>${contenidoImpresion}</pre>
			</body>
			</html>
		`);
		ventana.document.close();
		ventana.print();
	}
};

// ===== EJECUTAR CUANDO EL DOM ESTÉ LISTO =====
document.addEventListener("DOMContentLoaded", () => {
	Taquilla.init();
});
