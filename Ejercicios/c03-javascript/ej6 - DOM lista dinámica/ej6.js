// Ejercicio 6 - DOM: lista dinámica

let cantidad = 0;

function agregar() {
    let input = document.getElementById("producto");
    let lista = document.getElementById("lista");
    let contador = document.getElementById("contador");

    // valido que el input no esté vacío
    if (input.value === "") {
        alert("El campo no puede estar vacío");
        return;
    }

    // creo el li con el texto del input
    let li = document.createElement("li");
    li.textContent = input.value;

    // creo el botón eliminar
    let boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.onclick = function() {
        lista.removeChild(li);
        cantidad = cantidad - 1;
        contador.textContent = cantidad + " productos en la lista";
    };

    li.appendChild(boton);
    lista.appendChild(li);

    // actualizo el contador
    cantidad = cantidad + 1;
    contador.textContent = cantidad + " productos en la lista";

    // limpio el input
    input.value = "";
}
