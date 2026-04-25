"use strict";
let libro1 = {
    isbn: "1",
    titulo: "Don pepe",
    autor: "pepe",
    precio: 1500,
    disponible: true,
    genero: "fantasia"
};
let libro2 = {
    isbn: "2",
    titulo: "casa rodante",
    autor: "pepe",
    precio: 2000,
    disponible: false,
};
let libro3 = {
    isbn: "3",
    titulo: "arbol",
    autor: "ana",
    precio: 10,
    disponible: true,
    genero: "terror"
};
let libros = [libro1, libro2, libro3];
//fijo el lugar en donde voy a imprimir los resultados
let stat = document.getElementById("stats");
//recupero el div listado
let listado = document.getElementById("listado");
/* esta funcion filtra y muestra directamente
function buscarPorAutor(): void {
    //obtengo el valor del input de texto con id filtroAutor
    let autor: string = (document.getElementById("filtroAutor") as HTMLInputElement).value;
    //imprimo en el area del div resultado los libros que cumplan con la condicion
    resultado.textContent = libros.filter(libro => libro.autor === autor);
}*/
//funcion para mostrar cantidad y precio promedio en el parrafo de stadisticas
function mostrarStats(arrayLibro) {
    stat.textContent = `Cantidad:${arrayLibro.length} - precio Promedio:$${precioPromedio(arrayLibro).toFixed(2)}`;
}
// esta función solo filtra y retorna
function buscarPorAutor(autor) {
    return libros.filter(libro => libro.autor === autor);
}
// esta función se encarga de mostrar en el HTML
function mostrarFiltroAutor() {
    //recupero el autor
    let autor = document.getElementById("filtroAutor").value;
    //verifico que el campo no este vacio
    if (autor === "") {
        alert("El campo no puede estar vacío");
        return;
    }
    //Limpia el contenido del <ul> antes de agregar los nuevos resultados. Si no, cada vez que filtrás se van acumulando los resultados anteriores.
    listado.innerHTML = "";
    //listo en el HTML el array de libros que cumplen la condicion de autor
    buscarPorAutor(autor).forEach(libro => {
        listado.innerHTML += `<li>${libro.titulo} - ${libro.autor} - ${libro.precio}</li>`;
    });
    mostrarStats(buscarPorAutor(autor));
}
//funcion de retorno array de libros con diponibilidad true
function buscarDisponibles() {
    return libros.filter(libro => libro.disponible);
}
function mostrarFiltroDisponible() {
    //Limpia el contenido del <ul> antes de agregar los nuevos resultados. Si no, cada vez que filtrás se van acumulando los resultados anteriores.
    listado.innerHTML = "";
    buscarDisponibles().forEach(libro => {
        listado.innerHTML += `<li>${libro.titulo} - ${libro.autor} - ${libro.precio}</li>`;
    });
    mostrarStats(buscarDisponibles());
}
function mostrarTodos() {
    //Limpia el contenido del <ul> antes de agregar los nuevos resultados. Si no, cada vez que filtrás se van acumulando los resultados anteriores.
    listado.innerHTML = "";
    libros.forEach(libro => {
        listado.innerHTML += `<li>${libro.titulo} - ${libro.autor} - ${libro.precio}</li>`;
    });
    mostrarStats(libros);
}
function precioPromedio(libros) {
    // retorna promedio de todos los precios
    return (libros.reduce((total, libro) => total + libro.precio, 0)) / libros.length;
}
