// Ejercicio 2 - Condicionales

function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado";
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";
    } else if (nota >= 8) {
        return "Promocionado";
    }
}

function diaDeLaSemana(numero) {
    switch (numero) {
        case 1: return "Lunes";
        case 2: return "Martes";
        case 3: return "Miércoles";
        case 4: return "Jueves";
        case 5: return "Viernes";
        case 6: return "Sábado (fin de semana)";
        case 7: return "Domingo (fin de semana)";
        default: return "Día inválido";
    }
}

// pruebo con distintos valores
console.log(clasificarNota(2));
console.log(clasificarNota(6));
console.log(clasificarNota(9));

console.log(diaDeLaSemana(1));
console.log(diaDeLaSemana(6));
console.log(diaDeLaSemana(9));
