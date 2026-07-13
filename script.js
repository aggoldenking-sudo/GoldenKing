const animalesGranjita = { "00": "Ballena", "0": "Delfín", "01": "Carnero", "02": "Toro", "03": "Ciempiés", "04": "Alacrán", "05": "León", "06": "Rana", "07": "Perico", "08": "Ratón", "09": "Águila", "10": "Tigre", "11": "Gato", "12": "Caballo", "13": "Mono", "14": "Paloma", "15": "Zorro", "16": "Oso", "17": "Pavo", "18": "Burro", "19": "Chivo", "20": "Cochino", "21": "Gallo", "22": "Camello", "23": "Cebra", "24": "Iguana", "25": "Gallina", "26": "Vaca", "27": "Perro", "28": "Zamuro", "29": "Elefante", "30": "Caimán", "31": "Lapa", "32": "Ardilla", "33": "Pescado", "34": "Venado", "35": "Jirafa", "36": "Culebra" };

let ticket = [];

function cargarMatriz(diccionario) {
    const matriz = document.getElementById('matrizAnimalitos');
    matriz.innerHTML = "";
    for (let num in diccionario) {
        let btn = document.createElement('button');
        btn.className = 'btn-animal';
        btn.innerHTML = `${num}<br>${diccionario[num]}`;
        btn.onclick = () => {
            let monto = parseFloat(document.getElementById('monto').value);
            ticket.push({num, nombre: diccionario[num], monto});
            render();
        };
        matriz.appendChild(btn);
    }
}

function cambiarLoteria() {
    let tipo = document.getElementById('selectLoteria').value;
    if (tipo === "Granjita") cargarMatriz(animalesGranjita);
    // Aquí integraremos el Guacharo después
}

function render() {
    document.getElementById('cuerpoTicket').innerHTML = ticket.map((t,i) => `<tr><td>${t.num}-${t.nombre}</td><td>${t.monto}</td><td><button onclick="ticket.splice(${i},1);render()">X</button></td></tr>`).join('');
    document.getElementById('total').innerText = "Total: " + ticket.reduce((a,b) => a + b.monto, 0);
}

function imprimirTicket() {
    let win = window.open('','','width=300,height=400');
    win.document.write(`<pre>>>> GOLDEN KING <<<\n${ticket.map(t=>`${t.num}-${t.nombre} x ${t.monto}`).join('\n')}\nTOTAL: ${ticket.reduce((a,b)=>a+b.monto,0)}</pre>`);
    win.print();
}

window.onload = () => cargarMatriz(animalesGranjita);
