// Ejercicio 3 – Buscador de libros
// API: https://openlibrary.org/search.json?q=...

// ── Interfaces ───────────────────────────────────────────────────────────────

interface LibroOL {
  title: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface OpenLibraryResponse {
  docs: LibroOL[];
}

// ── Elementos del DOM ────────────────────────────────────────────────────────

const input = document.querySelector<HTMLInputElement>('#busqueda')!;
const boton = document.querySelector<HTMLButtonElement>('#btn-buscar')!;
const resultados = document.querySelector<HTMLDivElement>('#resultados')!;

// ── Lógica de búsqueda ───────────────────────────────────────────────────────

async function buscarLibros(): Promise<void> {
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

    const data: OpenLibraryResponse = await response.json();
    const primerosDiez: LibroOL[] = data.docs.slice(0, 10);

    mostrarResultados(primerosDiez, query);

  } catch (error) {
    mostrarError(`No se pudo conectar con Open Library: ${(error as Error).message}`);
  }
}

// ── Funciones de renderizado ─────────────────────────────────────────────────

function mostrarResultados(libros: LibroOL[], query: string): void {
  if (libros.length === 0) {
    resultados.innerHTML = `<p>Sin resultados para "<strong>${query}</strong>".</p>`;
    return;
  }

  const tarjetas = libros.map((libro: LibroOL) => crearTarjeta(libro)).join('');
  resultados.innerHTML = tarjetas;
}

function crearTarjeta(libro: LibroOL): string {
  const autor: string = libro.author_name
    ? `<p class="autor">${libro.author_name[0]}</p>`
    : '';

  const anio: string = libro.first_publish_year
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

function mostrarError(mensaje: string): void {
  resultados.innerHTML = `<p class="error">${mensaje}</p>`;
}

// ── Evento ───────────────────────────────────────────────────────────────────

boton.addEventListener('click', buscarLibros);