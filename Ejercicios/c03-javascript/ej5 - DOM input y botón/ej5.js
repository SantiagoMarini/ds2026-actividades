// Ejercicio 5 - DOM: input y botón

function generar() {
    let valor = document.getElementById("altura").value;
    let resultado = document.getElementById("resultado");

    // valido que no esté vacío y que sea mayor a 1
    if (valor === "" || valor < 1) {
        resultado.textContent = "Error: ingresá un número mayor a 1";
        return;
    }

    let altura = parseInt(valor);
    let arbol = "";

    for (let i = 1; i <= altura; i++) {
        for (let j = 0; j < i; j++) {
            arbol = arbol + "*";
        }
        arbol = arbol + "\n";
    }

    resultado.textContent = arbol;
}
