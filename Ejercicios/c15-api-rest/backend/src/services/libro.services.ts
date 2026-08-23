import { Libro } from "../types/autor.types.ts";

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

    let contId: number = 6;

    