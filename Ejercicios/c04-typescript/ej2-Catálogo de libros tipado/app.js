var libro1 = {
    isbn: "1",
    titulo: "Don pepe",
    autor: "pepe",
    precio: 1500,
    disponible: true,
    genero: "fantasia"
};
var libro2 = {
    isbn: "2",
    titulo: "casa rodante",
    autor: "pepe",
    precio: 2000,
    disponible: false
};
var libro3 = {
    isbn: "3",
    titulo: "arbol",
    autor: "ana",
    precio: 10,
    disponible: true,
    genero: "terror"
};
var libros = [libro1, libro2, libro3];
//fijo el lugar en donde voy a imprimir los resultados
var stat = document.getElementById("stats");
//recupero el div listado
var listado = document.getElementById("listado");
// esta función solo filtra y retorna
function buscarPorAutor(autor) {
    return libros.filter(function (libro) { return libro.autor === autor; });
}
//funcion de retorno array de libros con diponibilidad true
function buscarDisponibles() {
    return libros.filter(function (libro) { return libro.disponible; });
}
//promedio de los precios
function precioPromedio(libros) {
    // retorna promedio de todos los precios
    return (libros.reduce(function (total, libro) { return total + libro.precio; }, 0)) / libros.length;
}
//muestra los libros en el <ul> y actualiza el <p> de stats
function renderizar(libros) {
    //Limpia el contenido del <ul> antes de agregar los nuevos resultados. Si no, cada vez que filtrás se van acumulando los resultados anteriores.
    listado.innerHTML = "";
    libros.forEach(function (libro) {
        listado.innerHTML += "<li>".concat(libro.titulo, " - ").concat(libro.autor, " - ").concat(libro.precio, "</li>");
    });
    //mostrar cantidad y precio promedio en el parrafo de stadisticas
    stat.textContent = "Cantidad:".concat(libros.length, " - precio Promedio:$").concat(precioPromedio(libros).toFixed(2));
}
// esta función se encarga de mostrar en el HTML
function mostrarFiltroAutor() {
    //recupero el autor
    var autor = document.getElementById("filtroAutor").value;
    //verifico que el campo no este vacio
    if (autor === "") {
        alert("El campo no puede estar vacío");
        return;
    }
    //muestra en el html
    renderizar(buscarPorAutor(autor));
}
// botón Ver todos
function mostrarTodos() {
    renderizar(libros);
}
// botón Solo disponibles
function mostrarDisponibles() {
    renderizar(buscarDisponibles());
}
//para mostrar el catalogo al cargar la pagina
renderizar(libros);
