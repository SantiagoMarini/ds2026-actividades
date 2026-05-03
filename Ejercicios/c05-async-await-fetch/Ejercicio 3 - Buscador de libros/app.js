"use strict";
// Ejercicio 3 – Buscador de libros
// API: https://openlibrary.org/search.json?q=...
// ── Elementos del DOM ────────────────────────────────────────────────────────
const input = document.querySelector('#busqueda');
const boton = document.querySelector('#btn-buscar');
const resultados = document.querySelector('#resultados');
// ── Lógica de búsqueda ───────────────────────────────────────────────────────
async function buscarLibros() {
    const query = input.value.trim();
    // Validación: input vacío → mostrar error, no hacer fetch
    if (!query) {
        mostrarError('El campo de búsqueda no puede estar vacío.');
        return;
    }
    resultados.innerHTML = '<p>Buscando...</p>';
    try {
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        const primerosDiez = data.docs.slice(0, 10);
        mostrarResultados(primerosDiez, query);
    }
    catch (error) {
        mostrarError(`No se pudo conectar con Open Library: ${error.message}`);
    }
}
// ── Funciones de renderizado ─────────────────────────────────────────────────
function mostrarResultados(libros, query) {
    if (libros.length === 0) {
        resultados.innerHTML = `<p>Sin resultados para "<strong>${query}</strong>".</p>`;
        return;
    }
    const tarjetas = libros.map((libro) => crearTarjeta(libro)).join('');
    resultados.innerHTML = tarjetas;
}
function crearTarjeta(libro) {
    const autor = libro.author_name
        ? `<p class="autor">${libro.author_name[0]}</p>`
        : '';
    const anio = libro.first_publish_year
        ? `<p class="anio">${libro.first_publish_year}</p>`
        : '';
    return `
    <div class="tarjeta">
      <p class="titulo">${libro.title}</p>
      ${autor}
      ${anio}
    </div>
  `;
}
function mostrarError(mensaje) {
    resultados.innerHTML = `<p class="error">${mensaje}</p>`;
}
// ── Evento ───────────────────────────────────────────────────────────────────
boton.addEventListener('click', buscarLibros);
