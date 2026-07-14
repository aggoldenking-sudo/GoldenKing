window.calcularPremio = function(loteria, id, monto) {
    if (loteria === "Guacharo") {
        return (id === "75") ? monto * 120 : monto * 60;
    }
    return monto * 30;
};
