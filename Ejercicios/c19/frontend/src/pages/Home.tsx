import {LibroCard} from '../components/LibroCard';
import {Hero} from '../components/Hero';
import { librosDestacados } from '../data/librosDestacados';
import minerales from '../assets/img/Background.webp';


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
                    librosDestacados.map( (l) =>
                        <LibroCard key={l.id} libro={l} />
                    )
                    }
                </div>
            </div>
        
        </div>
    );
    }
