import {LibroCard} from '../components/LibroCard';
import {Hero} from '../components/Hero';
import {type Libro} from '../types/libro.ts';
import minerales from '../assets/img/Background.webp';


//libros del home hardcoreados. cuando se le da click a ver mas, se muestra el detalle del libro que se encuentre con nombre similar en la libreria de openlibrary
const librosDestacados: Libro[] = [
    {
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        precio: 15000,
        imagen: "https://www.edicontinente.com.ar/image/titulos/9788466379717.jpg"
    },
    {
        titulo: "El nombre de la rosa",
        autor: "Umberto Eco",
        precio: 18000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHx-Tlw3Ny-DkHPeA5zM6eUAHbuBaemh-6Q&"
    },
    {   
        titulo: "1984",
        autor: "George Orwell",
        precio: 12000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5ZXOb00AiZtPAIKONBmOeFkSpQ7-HkolJg&s"
    },
    {
        titulo: "Rayuela",
        autor: "Julio Cortázar",
        precio: 16000,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cvb4GTVUgnp66yfvr6V7WqRRb1lwAHKMSA&s"
    },
    {
        titulo: "El Principito",
        autor: "Antoine de Saint-Exupéry",
        precio: 10000,
        imagen: "https://tienda.planetadelibros.com.ar/cdn/shop/products/portada_el-principito_antoine-de-saint-exupery_201507152131.jpg?v=1684356025"
    },
    {
        titulo: "Ficciones",
        autor: "Jorge Luis Borges",
        precio: 14000,
        imagen: "https://sibaritalarevista.com/wp-content/uploads/2026/03/libros.jpg"
    }
    ];

    export function Home(){
    return (
        <div className="min-h-screen bg-size-[auto_100%] bg-repeat"
            style={{ backgroundImage: `url(${minerales})` }}>

            <Hero />

            <div className='max-w-6xl mx-auto px-6 py-12'>
                <h2 className='text-center text-2xl md:text-4xl font-bold text-white mb-10 [text-shadow:3px_3px_#000]'>
                    LIBROS DESTACADOS
                </h2>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                    {
                    librosDestacados.map( (l, i) =>
                        <LibroCard key={i} libro={l} />
                    )
                    }
                </div>
            </div>
        
        </div>
    );
    }