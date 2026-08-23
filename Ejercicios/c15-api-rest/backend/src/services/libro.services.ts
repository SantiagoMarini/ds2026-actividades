import { Libro } from "../types/libro.types";

const libros: Libro[] = [
    {
        id: 1,
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: 15000,
        imagen: "https://www.edicontinente.com.ar/image/titulos/9788466379717.jpg",
        disponible: true
    },
    {
        id: 2,
        titulo: "El nombre de la rosa",
        autor: "Umberto Eco",
        precio: 18000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHx-Tlw3Ny-DkHPeA5zM6eUAHbuBaemh-6Q&",
        disponible: true
    },
    {   
        id: 3,
        titulo: "1984",
        autor: "George Orwell",
        precio: 12000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5ZXOb00AiZtPAIKONBmOeFkSpQ7-HkolJg&s",
        disponible: true
    },
    {
        id: 4,
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        precio: 16000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cvb4GTVUgnp66yfvr6V7WqRRb1lwAHKMSA&s",
        disponible: true
    },
    {
        id: 5,
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 10000,
        imagen: "https://tienda.planetadelibros.com.ar/cdn/shop/products/portada_el-principito_antoine-de-saint-exupery_201507152131.jpg?v=1684356025",
        disponible: false
    },
    {
        id: 6,
        titulo: "Ficciones",
        autor: "Jorge Luis Borges",
        precio: 14000,
        imagen: "https://sibaritalarevista.com/wp-content/uploads/2026/03/libros.jpg",
        disponible: false
    }
    ];

let proximoId = 11;

// Este service no sabe que existe HTTP: no ve req ni res, y no devuelve status codes.
// Si "disponible" viene undefined, devuelve todo.
export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(libro => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(libro => libro.id === id);
}
// Omit<Libro, "id"> = un Libro sin el id. El id lo pone el servidor, no el cliente.
export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return undefined;
  libros[i] = { id, ...datos };
  return libros[i];
}

export function remove(id: number): boolean {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}
    