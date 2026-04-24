// Ejercicio 3 - Funciones con lógica

function calcularPrecioFinal(monto, medioPago) {
    let descuento = 0;

    if (monto < 200) {
        // sin descuento para cualquier medio de pago
        descuento = 0;
    } else if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") {
            descuento = 0.30;
        } else if (medioPago === "D") {
            descuento = 0.20;
        } else if (medioPago === "C") {
            descuento = 0.10;
        }
    } else if (monto > 400) {
        descuento = 0.40;
    }

    return monto - monto * descuento;
}

// pruebo con 5 combinaciones distintas
let resultado1 = calcularPrecioFinal(150, "E");
console.log(`Monto: $150 | Pago: E | Final: $${resultado1}`);

let resultado2 = calcularPrecioFinal(300, "E");
console.log(`Monto: $300 | Pago: E | Final: $${resultado2}`);

let resultado3 = calcularPrecioFinal(300, "D");
console.log(`Monto: $300 | Pago: D | Final: $${resultado3}`);

let resultado4 = calcularPrecioFinal(300, "C");
console.log(`Monto: $300 | Pago: C | Final: $${resultado4}`);

let resultado5 = calcularPrecioFinal(500, "E");
console.log(`Monto: $500 | Pago: E | Final: $${resultado5}`);
