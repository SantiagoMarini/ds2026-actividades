import { useState } from 'react';
import bedrock from '../../assets/img/bedrock.webp';
import vacio from '../../assets/img/vacio.jpg';

const frasesMinecraft = [
    "Los pollos solo te prestarán atención si le muestras semillas y no hablo de pollos ni de semillas",
    "Una base sin antorchas es un hogar para monstruos.",
    "Nunca caves hacia abajo.",
    "El creeper q no ves venir es el q mas daño hará",
    "No elijes el lugar en el que inicias , pero si en el que terminas",
    "Si activas los trucos no conseguirás logros"
];

export function Footer() {
    const [fraseAleatoria, setFraseAleatoria] = useState(() => 
        frasesMinecraft[Math.floor(Math.random() * frasesMinecraft.length)]
    );

    const cambiarFrase = () => {
        let nuevaFrase = fraseAleatoria;
        while (nuevaFrase === fraseAleatoria) {
            nuevaFrase = frasesMinecraft[Math.floor(Math.random() * frasesMinecraft.length)];
        }
        setFraseAleatoria(nuevaFrase);
    };

    return (
        <footer className='bg-repeat bg-size-[auto_100%] pb-6 border-t-4 border-black w-full mt-auto'
            style={{ backgroundImage: `url(${vacio})` }}>
            

            <div className='h-20 bg-repeat bg-size-[auto_100%] pb-10'
            style={{ backgroundImage: `url(${bedrock})` }}></div>
            

            <div className='w-full pt-4 px-6'>
                

                <div className="flex justify-start">
                    <button 
                        onClick={cambiarFrase}
                        className="btn-minecraft flex justify-center items-center w-12 h-10 p-1"
                        title="Cambiar frase"
                    >
                        <span className="text-white text-2xl font-bold pb-4">↻</span>
                    </button>
                </div>
                

                <p className='pt-5 text-lg text-white text-center font-bold [text-shadow:2px_2px_0px_#000] mt-2 md:-mt-4 px-4'>
                    {fraseAleatoria}
                </p>

            </div>

        </footer>
    );
}