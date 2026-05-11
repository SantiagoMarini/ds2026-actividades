"use strict";

// ── Elementos del DOM ────────────────────────────────────────────────────────
const input     = document.querySelector('#busqueda');
const boton     = document.querySelector('#btn-buscar');
const resultados = document.querySelector('#resultados');

// ── Lógica de búsqueda ───────────────────────────────────────────────────────
async function buscarLibros() {
    const query = input.value.trim();

    if (!query) {
        mostrarError('El campo de búsqueda no puede estar vacío.');
        return;
    }

    resultados.innerHTML = '<p class="text-center">Buscando...</p>';

    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const primerosDiez = data.docs.slice(0, 10);
        mostrarResultados(primerosDiez, query);

    } catch (error) {
        mostrarError(`No se pudo conectar con Open Library: ${error.message}`);
    }
}

// ── Funciones de renderizado ─────────────────────────────────────────────────
function mostrarResultados(libros, query) {
    if (libros.length === 0) {
        resultados.innerHTML = `<p class="text-center">Sin resultados para "<strong>${query}</strong>".</p>`;
        return;
    }

    const tarjetas = libros.map((libro) => crearTarjeta(libro)).join('');
    resultados.innerHTML = tarjetas;
}

function crearTarjeta(libro) {
    const autor = libro.author_name
        ? libro.author_name[0]
        : 'Autor desconocido';

    const imagen = libro.cover_i
        ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
        : `https://picsum.photos/seed/${encodeURIComponent(libro.title)}/400/300`;

    return `
        <div class="col">
            <div class="card h-100">
                <img src="${imagen}" class="card-img-top" alt="Portada de ${libro.title}" style="height:220px; object-fit:cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text">${autor}</p>
                    <a href="libro.html" class="btn-ver-mas mt-auto align-self-start">Ver más</a>
                </div>
            </div>
        </div>
    `;
}

function mostrarError(mensaje) {
    resultados.innerHTML = `<p class="text-danger text-center">${mensaje}</p>`;
}

// ── Evento ───────────────────────────────────────────────────────────────────
boton.addEventListener('click', buscarLibros);

// Permitir buscar con Enter
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarLibros();
});
