//componente para que la imagen de fondo 'continue' la imagen del Header y transicione a la imagen minerales

import { type ReactNode } from 'react';
import bgTierra from '../assets/img/Header-background.png'; 
import minerales from '../assets/img/Background.webp';

const ALTO_IMAGEN_TOTAL = 512;
const ALTO_HEADER = 160;

// Definimos que el componente va a recibir 'children' (contenido)
interface FondoCavernaProps {
    children: ReactNode;
}

export function Fondo({ children }: FondoCavernaProps) {
    return (
        <div className="min-h-screen relative flex flex-col">
            
            {/* Franja de transición (Tierra) */}
            <div
                className="w-full bg-repeat-x shrink-0"
                style={{
                    backgroundImage: `url(${bgTierra})`,
                    backgroundSize: `auto ${ALTO_IMAGEN_TOTAL}px`,
                    backgroundPosition: `0 -${ALTO_HEADER}px`,
                    height: `${ALTO_IMAGEN_TOTAL - ALTO_HEADER}px`,
                    imageRendering: 'pixelated',
                }}
            />

            <div 
                className="flex-1 bg-auto bg-repeat"
                style={{ 
                    backgroundImage: `url(${minerales})`,
                    imageRendering: 'pixelated'
                }}
            >
                <div className="max-w-6xl mx-auto px-6 pb-12 relative z-10 -mt-64 md:-mt-72">
                    
                    {children}

                </div>
            </div>    
        </div>
    );
}