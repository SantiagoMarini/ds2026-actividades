//creo algunos libros
var libro1 = {
    isbn: "1",
    nombre: "Don pepe",
    autor: "pepe",
    precio: 1500,
    disponible: true,
    genero: "fantasia"
};
var libro2 = {
    isbn: "2",
    nombre: "casa rodante",
    autor: "pepe",
    precio: 2000,
    disponible: false
};
var libro3 = {
    isbn: "3",
    nombre: "arbol",
    autor: "ana",
    precio: 10,
    disponible: true,
    genero: "terror"
};
//creo y cargo array de libros
var catalogo = [libro1, libro2, libro3];
//fijo el lugar en donde voy a imprimir los resultados
var stat = document.getElementById("stats");
//recupero el div listado
var listado = document.getElementById("listado");
//recupero el formulario
var formulario = document.getElementById('formularioLibro');
//recupero el parrafo donde muestro los errores al agregar
var errorForm = document.getElementById("errorForm");
// esta función solo filtra y retorna
function buscarPorAutor(autor) {
    return catalogo.filter(function (libro) { return libro.autor === autor; });
}
//funcion de retorno array de libros con diponibilidad true
function buscarDisponibles() {
    return catalogo.filter(function (libro) { return libro.disponible; });
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
        listado.innerHTML += "<li>".concat(libro.nombre, " - ").concat(libro.autor, " - ").concat(libro.precio, "\n        <button onclick=\"eliminarLibro('").concat(libro.isbn, "')\">Eliminar</button> </li>");
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
    renderizar(catalogo);
}
// botón Solo disponibles
function mostrarDisponibles() {
    renderizar(buscarDisponibles());
}
//
function validarFormulario() {
    //obtengo los valores de los inputs
    var input_autor = document.getElementById("autor").value;
    var input_nombre = document.getElementById("nombre").value;
    var input_precio = Number(document.getElementById("precio").value);
    var input_genero = document.getElementById("genero").value;
    var input_disponibilidad = document.getElementById("disponibilidad").value;
    //limpio el error form
    errorForm.textContent = "";
    //valido los campos manualmente
    //campo para autor
    if (input_autor == "") {
        errorForm.textContent = "Debe ingresar el autor para agregar un libro";
        return null;
    }
    //campo para nombre
    if (input_nombre == "") {
        errorForm.textContent = "Debe ingresar el nombre para agregar un libro";
        return null;
    }
    //campo para precio
    if (isNaN(input_precio) || input_precio <= 0 || input_precio == null) {
        //isNaN(input_precio) verifica que sea un numero valido, incluye que no sea vacio
        errorForm.textContent = "Debe ingresar un precio valido para agregar un libro";
        return null;
    }
    //campo para disponibilidad solo verifico que no este vacio
    if (input_disponibilidad == "") {
        errorForm.textContent = "Debe seleccionar una disponibilidad para agregar un libro";
        return null;
    }
    var libro = {
        isbn: "AUTO-" + Date.now(),
        autor: input_autor,
        nombre: input_nombre,
        genero: input_genero,
        disponible: (input_disponibilidad === "si"),
        precio: input_precio
    };
    return libro;
}
//funcion para agregar libro al catalogo y limpiar el formulario
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
    //reseteo los valores del formulario
    formulario.reset();
}
//funcion para eliminar libro del catalogo
function eliminarLibro(isbn) {
    //filtro el catalogo y devuelvo los que no tengan el mismo isbn, equivale a eliminarlo.
    catalogo = catalogo.filter(function (libro) { return libro.isbn !== isbn; });
    renderizar(catalogo);
}
//obtengo el boton agregar y con "!.addEventListener" cada vez que se ejecuta un click se llama a la "funcion que ocurre adentro"
document.getElementById("agregar").addEventListener("click", function () {
    //creo un libro con los valores del formulario validado
    var libro = validarFormulario();
    if (libro) { //si esta los campos estan correctamente cargados los agrego a la lista, los renderizo y limpio el formulario
        agregarLibro(libro);
    }
});
//para mostrar el catalogo al cargar la pagina
renderizar(catalogo);
