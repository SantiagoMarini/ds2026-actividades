"use strict";
function generar() {
    let valor = Number(document.getElementById("altura").value);
    let resultado = document.getElementById("resultado");
    // valido que no esté vacío y que sea mayor a 1
    if (valor < 1 || valor == null) {
        resultado.textContent = "Error: ingresá un número mayor a 1";
        return;
    }
    let arbol = "";
    for (let i = 1; i <= valor; i++) {
        for (let j = 1; j <= i; j++) {
            arbol = arbol + "*";
        }
        arbol = arbol + "\n";
    }
    resultado.textContent = arbol;
}
