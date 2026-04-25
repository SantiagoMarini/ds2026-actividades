interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    precio: number;
    disponible: boolean;
    genero?: string; // el ? significa que es opcional
}


let libro1: Libro = {
    isbn: "1",
    titulo: "Don pepe",
    autor: "pepe",
    precio: 1500,
    disponible: true,
    genero: "fantasia"
};

let libro2: Libro = {
    isbn: "2",
    titulo: "casa rodante",
    autor: "pepe",
    precio: 2000,
    disponible: false,
};

let libro3: Libro = {
    isbn: "3",
    titulo: "arbol",
    autor: "ana",
    precio: 10,
    disponible: true,
    genero: "terror"
};

let libros: Libro[] = [libro1, libro2, libro3 ];

//fijo el lugar en donde voy a imprimir los resultados
let stat: any = document.getElementById("stats") as HTMLInputElement;

//recupero el div listado
let listado = document.getElementById("listado") as HTMLElement;


// esta función solo filtra y retorna
function buscarPorAutor(autor: string): Libro[] {
    return libros.filter(libro => libro.autor === autor);
}


//funcion de retorno array de libros con diponibilidad true
function buscarDisponibles(): Libro[] {
    return libros.filter(libro => libro.disponible);
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
        listado.innerHTML += `<li>${libro.titulo} - ${libro.autor} - ${libro.precio}</li>`
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
    renderizar(libros);
}

// botón Solo disponibles
function mostrarDisponibles(): void {
    renderizar(buscarDisponibles());
}

//para mostrar el catalogo al cargar la pagina
renderizar(libros);