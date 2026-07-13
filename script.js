const DATA_LOTERIAS = {
    Granjita: { "00": "Ballena", "0": "Delfín", "01": "Carnero", "02": "Toro", "03": "Ciempiés", "04": "Alacrán", "05": "León", "06": "Rana", "07": "Perico", "08": "Ratón", "09": "Águila", "10": "Tigre", "11": "Gato", "12": "Caballo", "13": "Mono", "14": "Paloma", "15": "Zorro", "16": "Oso", "17": "Pavo", "18": "Burro", "19": "Chivo", "20": "Cochino", "21": "Gallo", "22": "Camello", "23": "Cebra", "24": "Iguana", "25": "Gallina", "26": "Vaca", "27": "Perro", "28": "Zamuro", "29": "Elefante", "30": "Caimán", "31": "Lapa", "32": "Ardilla", "33": "Pescado", "34": "Venado", "35": "Jirafa", "36": "Culebra" },
    Guacharo: { "0": "Delfín", "00": "Ballena", "01": "Carnero", "02": "Toro", "03": "Ciempiés", "04": "Alacrán", "05": "León", "06": "Rana", "07": "Perico", "08": "Ratón", "09": "Águila", "10": "Tigre", "11": "Gato", "12": "Caballo", "13": "Mono", "14": "Paloma", "15": "Zorro", "16": "Oso", "17": "Pavo", "18": "Burro", "19": "Chivo", "20": "Cochino", "21": "Gallo", "22": "Camello", "23": "Cebra", "24": "Iguana", "25": "Gallina", "26": "Vaca", "27": "Perro", "28": "Zamuro", "29": "Elefante", "30": "Caimán", "31": "Lapa", "32": "Ardilla", "33": "Pescado", "34": "Venado", "35": "Jirafa", "36": "Culebra", "37": "Tortuga", "38": "Bufalo", "39": "Lechuza", "40": "Avispa", "41": "Canguro", "42": "Tucán", "43": "Mariposa", "44": "Chiguire", "45": "Garza", "46": "Puma", "47": "Pavo Real", "48": "Puercoespín", "49": "Pereza", "50": "Canario", "51": "Pelicano", "52": "Pulpo", "53": "Caracol", "54": "Grillo", "55": "Oso Hormiguero", "56": "Tiburón", "57": "Pato", "58": "Hormiga", "59": "Pantera", "60": "Camaleón", "61": "Panda", "62": "Cachicamo", "63": "Cangrejo", "64": "Gavilán", "65": "Araña", "66": "Lobo", "67": "Avestruz", "68": "Jaguar", "69": "Conejo", "70": "Bisonte", "71": "Guacamaya", "72": "Gorila", "73": "Hipopótamo", "74": "Turpial", "75": "Comodín" },
    LottoActivo: { "00": "Ballena", "0": "Delfín", "01": "Carnero", "02": "Toro", "03": "Ciempiés", "04": "Alacrán", "05": "León", "06": "Rana", "07": "Perico", "08": "Ratón", "09": "Águila", "10": "Tigre", "11": "Gato", "12": "Caballo", "13": "Mono", "14": "Paloma", "15": "Zorro", "16": "Oso", "17": "Pavo", "18": "Burro", "19": "Chivo", "20": "Cochino", "21": "Gallo", "22": "Camello", "23": "Cebra", "24": "Iguana", "25": "Gallina", "26": "Vaca", "27": "Perro", "28": "Zamuro", "29": "Elefante", "30": "Caimán", "31": "Lapa", "32": "Ardilla", "33": "Pescado", "34": "Venado", "35": "Jirafa", "36": "Culebra" },
    SelvaPlus: { "00": "Ballena", "0": "Delfín", "01": "Carnero", "02": "Toro", "03": "Ciempiés", "04": "Alacrán", "05": "León", "06": "Rana", "07": "Perico", "08": "Ratón", "09": "Águila", "10": "Tigre", "11": "Gato", "12": "Caballo", "13": "Mono", "14": "Paloma", "15": "Zorro", "16": "Oso", "17": "Pavo", "18": "Burro", "19": "Chivo", "20": "Cochino", "21": "Gallo", "22": "Camello", "23": "Cebra", "24": "Iguana", "25": "Gallina", "26": "Vaca", "27": "Perro", "28": "Zamuro", "29": "Elefante", "30": "Caimán", "31": "Lapa", "32": "Ardilla", "33": "Pescado", "34": "Venado", "35": "Jirafa", "36": "Culebra" }
};

const App = {
    monto: 50,
    ticket: [],
    setMonto(m) { this.monto = m; document.getElementById('displayMonto').innerText = m; },
    initMatriz() {
        const tipo = document.getElementById('loteriaSelect').value;
        const matriz = document.getElementById('matrizAnimalitos');
        matriz.innerHTML = "";
        const items = DATA_LOTERIAS[tipo];
        for (let id in items) {
            let btn = document.createElement('button');
            btn.className = 'btn-animal';
            btn.innerHTML = `<strong>${id}</strong><br>${items[id]}`;
            btn.onclick = () => { this.ticket.push({id, nombre: items[id], monto: this.monto}); this.renderTicket(); };
            matriz.appendChild(btn);
        }
    },
    renderTicket() {
        const table = document.getElementById('ticketTable');
        table.innerHTML = this.ticket.map((t, i) => `<tr><td>${t.id} ${t.nombre}</td><td>${t.monto}</td><td><button onclick="App.removerItem(${i})">X</button></td></tr>`).join('');
        this.actualizarTotal();
    },
    removerItem(i) { this.ticket.splice(i, 1); this.renderTicket(); },
    actualizarTotal() { document.getElementById('totalDisplay').innerText = "Total: " + this.ticket.reduce((a, b) => a + b.monto, 0); }
};
window.onload = () => App.initMatriz();
