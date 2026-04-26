interface Libro {
    isbn: string;
    nombre: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; // el ? significa que es opcional
}

//creo algunos libros
let libro1: Libro = {
    isbn: "1",
    nombre: "Don pepe",
    autor: "pepe",
    precio: 1500,
    disponible: true,
    genero: "fantasia"
};

let libro2: Libro = {
    isbn: "2",
    nombre: "casa rodante",
    autor: "pepe",
    precio: 2000,
    disponible: false,
};

let libro3: Libro = {
    isbn: "3",
    nombre: "arbol",
    autor: "ana",
    precio: 10,
    disponible: true,
    genero: "terror"
};

//creo y cargo array de libros
let catalogo: Libro[] = [libro1, libro2, libro3 ];


//fijo el lugar en donde voy a imprimir los resultados
let stat: any = document.getElementById("stats") as HTMLInputElement;

//recupero el div listado
let listado = document.getElementById("listado") as HTMLElement;

//recupero el formulario
let formulario: any = document.getElementById('formularioLibro') as HTMLFormElement;

//recupero el parrafo donde muestro los errores al agregar
let errorForm: any = document.getElementById("errorForm") as HTMLInputElement;



// esta función solo filtra y retorna
function buscarPorAutor(autor: string): Libro[] {
    return catalogo.filter(libro => libro.autor === autor);
}


//funcion de retorno array de libros con diponibilidad true
function buscarDisponibles(): Libro[] {
    return catalogo.filter(libro => libro.disponible);
}


//promedio de los precios
function precioPromedio(libros: Libro[]): number {
   // retorna promedio de todos los precios
    return (libros.reduce((total, libro) => total + libro.precio, 0))/libros.length;
}


//muestra los libros en el <ul> y actualiza el <p> de stats
function renderizar(libros: Libro[]): void {

    //Limpia el contenido del <ul> antes de agregar los nuevos resultados. Si no, cada vez que filtrás se van acumulando los resultados anteriores.
    listado.innerHTML = "";

    libros.forEach(libro => {
        listado.innerHTML += `<li>${libro.nombre} - ${libro.autor} - ${libro.precio}
        <button onclick="eliminarLibro('${libro.isbn}')">Eliminar</button> </li>`
    })

    //mostrar cantidad y precio promedio en el parrafo de stadisticas
    stat.textContent = `Cantidad:${libros.length} - precio Promedio:$${precioPromedio(libros).toFixed(2)}`;

}


// esta función se encarga de mostrar en el HTML
function mostrarFiltroAutor(): void {
    //recupero el autor
    let autor: string = (document.getElementById("filtroAutor") as HTMLInputElement).value;

    //verifico que el campo no este vacio
    if (autor === "") {
        alert("El campo no puede estar vacío");
        return;
    }
    
    //muestra en el html
    renderizar(buscarPorAutor(autor));
}


// botón Ver todos
function mostrarTodos(): void {
    renderizar(catalogo);
}


// botón Solo disponibles
function mostrarDisponibles(): void {
    renderizar(buscarDisponibles());
}


//
function validarFormulario(): Libro | null {

    //obtengo los valores de los inputs
    let input_autor: string = (document.getElementById("autor") as HTMLInputElement).value;
    let input_nombre: string = (document.getElementById("nombre") as HTMLInputElement).value;
    let input_precio: number = Number((document.getElementById("precio") as HTMLInputElement).value);
    let input_genero: string = (document.getElementById("genero") as HTMLInputElement).value;
    let input_disponibilidad: string = (document.getElementById("disponibilidad") as HTMLInputElement).value;

    //limpio el error form
    errorForm.textContent = ``;

    //valido los campos manualmente
    //campo para autor
    if (input_autor == ""){
        errorForm.textContent= "Debe ingresar el autor para agregar un libro";
        return null;
    }

    //campo para nombre
    if (input_nombre == ""){
        errorForm.textContent= "Debe ingresar el nombre para agregar un libro";
        return null;
    }

    //campo para precio
    if (isNaN(input_precio) || input_precio <= 0 || input_precio == null ){
        //isNaN(input_precio) verifica que sea un numero valido, incluye que no sea vacio
        errorForm.textContent= "Debe ingresar un precio valido para agregar un libro";
        return null;
    }

    //campo para disponibilidad solo verifico que no este vacio
    if (input_disponibilidad == ""){
        errorForm.textContent= "Debe seleccionar una disponibilidad para agregar un libro";
        return null;
    }

    let libro: Libro = {

        isbn: "AUTO-" + Date.now(),
        autor: input_autor,
        nombre: input_nombre,
        genero: input_genero,
        disponible: (input_disponibilidad === "si"), //transforma a booleano el input de disponibilidad que es un string
        precio: input_precio
    }

    return libro;
}


//funcion para agregar libro al catalogo y limpiar el formulario
function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
    //reseteo los valores del formulario
    formulario.reset();
}


//funcion para eliminar libro del catalogo
function eliminarLibro(isbn: string): void {
    //filtro el catalogo y devuelvo los que no tengan el mismo isbn, equivale a eliminarlo.
    catalogo = catalogo.filter(libro => libro.isbn !== isbn)
    renderizar(catalogo);
}

//obtengo el boton agregar y con "!.addEventListener" cada vez que se ejecuta un click se llama a la "funcion que ocurre adentro"
document.getElementById("agregar")!.addEventListener("click", () => {
    //creo un libro con los valores del formulario validado
    const libro = validarFormulario();
    if (libro){ //si esta los campos estan correctamente cargados los agrego a la lista, los renderizo y limpio el formulario
    agregarLibro(libro);
    }
});




//para mostrar el catalogo al cargar la pagina
renderizar(catalogo);