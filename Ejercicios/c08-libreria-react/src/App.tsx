import {type Libro, LibroCard} from './components/LibroCard'
import {Navbar} from './components/NabBar'
import {Hero} from './components/Hero'
import minerales from './assets/img/Background.webp';

const librosDestacados: Libro[] = [
  {
    titulo: "Cien años de soledad",
    texto: "Obra cumbre del realismo mágico.",
    autor: "Gabriel García Márquez",
    precio: 15000,
    imagen: "https://www.edicontinente.com.ar/image/titulos/9788466379717.jpg"
  },
  {
    titulo: "El nombre de la rosa",
    texto: "Un misterio en una abadía medieval.",
    autor: "Umberto Eco",
    precio: 18000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHx-Tlw3Ny-DkHPeA5zM6eUAHbuBaemh-6Q&"
  },
  {
    titulo: "1984",
    texto: "Una visión distópica del futuro.",
    autor: "George Orwell",
    precio: 12000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl5ZXOb00AiZtPAIKONBmOeFkSpQ7-HkolJg&s"
  },
  {
    titulo: "Rayuela",
    texto: "Una novela que se puede leer de múltiples formas.",
    autor: "Julio Cortázar",
    precio: 16000,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_cvb4GTVUgnp66yfvr6V7WqRRb1lwAHKMSA&s"
  },
  {
    titulo: "El Principito",
    texto: "Lo esencial es invisible a los ojos.",
    autor: "Antoine de Saint-Exupéry",
    precio: 10000,
    imagen: "https://tienda.planetadelibros.com.ar/cdn/shop/products/portada_el-principito_antoine-de-saint-exupery_201507152131.jpg?v=1684356025"
  },
  {
    titulo: "Ficciones",
    texto: "Cuentos que exploran laberintos y espejos.",
    autor: "Jorge Luis Borges",
    precio: 14000,
    imagen: "https://sibaritalarevista.com/wp-content/uploads/2026/03/libros.jpg"
  }
];

function App(){
  return (
    <div className="min-h-screen bg-[length:auto_100%] bg-repeat"
        style={{ backgroundImage: `url(${minerales})` }}>

        <Navbar />
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

export default App;