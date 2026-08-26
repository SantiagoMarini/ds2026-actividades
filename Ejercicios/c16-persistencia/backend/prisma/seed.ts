    import { prisma } from "../src/config/prisma";
    
    const autores = [
    {
        id: 101,
        nombre: "Gabriel García Márquez",
        nacionalidad: "Colombiana"
    },
    {
        id: 102,
        nombre: "Umberto Eco",
        nacionalidad: "Italiana"
    },
    {
        id: 103,
        nombre: "George Orwell",
        nacionalidad: "Británica"
    },
    {
        id: 104,
        nombre: "Julio Cortázar",
        nacionalidad: "Argentina"
    },
    {
        id: 105,
        nombre: "Antoine de Saint-Exupéry",
        nacionalidad: "Francesa"
    },
    {
        id: 106,
        nombre: "Jorge Luis Borges",
        nacionalidad: "Argentina"
    }
];


const libros = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: 15000,
        imagen: "https://www.edicontinente.com.ar/image/titulos/9788466379717.jpg",
        disponible: true,
        categoria: "Novela"
    },
    {
        titulo: "El nombre de la rosa",
        autor: "Umberto Eco",
        precio: 18000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHx-Tlw3Ny-DkHPeA5zM6eUAHbuBaemh-6Q&",
        disponible: true,
        categoria: "Novela"
    },
    {   
        titulo: "1984",
        autor: "George Orwell",
        precio: 12000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5ZXOb00AiZtPAIKONBmOeFkSpQ7-HkolJg&s",
        disponible: true,
        categoria: "Ensayo"
    },
    {
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        precio: 16000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cvb4GTVUgnp66yfvr6V7WqRRb1lwAHKMSA&s",
        disponible: true,
        categoria: "Técnico"
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 10000,
        imagen: "https://tienda.planetadelibros.com.ar/cdn/shop/products/portada_el-principito_antoine-de-saint-exupery_201507152131.jpg?v=1684356025",
        disponible: false,
        categoria: "Novela"
    },
    {
        titulo: "Ficciones",
        autor: "Jorge Luis Borges",
        precio: 14000,
        imagen: "https://sibaritalarevista.com/wp-content/uploads/2026/03/libros.jpg",
        disponible: false,
        categoria: "Novela"
    }
    ];



async function main() {
    await prisma.autor.createMany({ data: autores });
    await prisma.libro.createMany({ data: libros });
}
main();