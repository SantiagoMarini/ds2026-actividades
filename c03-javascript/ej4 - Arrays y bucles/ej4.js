const numeros = [4, 8, 15, 16, 23, 42, 7, 3];

let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (let i = 0; i < numeros.length; i++) {
    suma = suma + numeros[i];

    if (numeros[i] > mayor) {
        mayor = numeros[i];
    }

    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}

let promedio = suma / numeros.length;

console.log("Suma total: " + suma);
console.log("Promedio: " + promedio);
console.log("Número mayor: " + mayor);
console.log("Número menor: " + menor);

// función que genera asteriscos con un bucle for
function generarAsteriscos(n) {
    let resultado = "";
    for (let i = 0; i < n; i++) {
        resultado = resultado + "*";
    }
    return resultado;
}

console.log(generarAsteriscos(5));
console.log(generarAsteriscos(3));
