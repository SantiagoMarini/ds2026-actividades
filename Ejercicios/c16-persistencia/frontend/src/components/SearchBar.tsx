import { useState } from 'react';

export interface SearchBarProps {
    placeholder?: string;
    etiqueta?: string;
    onBuscar: (termino: string) => void;
}


export function SearchBar({ placeholder = "Buscar...", etiqueta = "", onBuscar }: SearchBarProps) {
    const [input, setInput] = useState('');

    const manejarBusqueda = () => {
        onBuscar(input);
    };

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') manejarBusqueda();
    };

    return (
        <div className="flex flex-col mb-10 w-full md:w-3/4 lg:w-2/3 mx-auto">
            
            {etiqueta && (
                <label className="text-white text-lg mb-2 [text-shadow:2px_2px_0px_#000]">
                    {etiqueta}
                </label>
            )}
            
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <input
                    type="text"
                    placeholder={placeholder}
                    className="p-3 text-lg bg-black border-2 border-[#a0a0a0] text-white placeholder-[#8b8b8b] w-full focus:outline-none focus:border-white transition-colors"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onEnter}
                />
                
                <button 
                    onClick={manejarBusqueda}
                    className="btn-minecraft-green px-8 py-3 text-lg shrink-0"
                >
                    <span className="translate-y-1 inline-block">Buscar</span>
                </button>
            </div>
            
        </div>
    );
}