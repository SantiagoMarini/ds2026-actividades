import { useState } from 'react';
import { Fondo } from '../components/Fondo';
import { CATEGORIAS_TEMPORALES } from '../data/categoriasTemporales';
import { libroSchema } from '../schemas/libroSchema';

type FormLibro = {
    titulo: string;
    autor: string;
    precio: string;
    imagen: string;
    disponible: boolean;
    categoriaIds: number[];
};

const FORM_INICIAL: FormLibro = {
    titulo: '',
    autor: '',
    precio: '',
    imagen: '',
    disponible: true,
    categoriaIds: [],
};

function esUrlDeImagenValida(valor: string) {
    try {
        const url = new URL(valor);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}

export function LibroNuevo() {
    const [form, setForm] = useState<FormLibro>(FORM_INICIAL);

    const [errores, setErrores] = useState<Record<string, string>>({});
    const [mensajeExito, setMensajeExito] = useState(false);
    const [imagenFallida, setImagenFallida] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });

        if (name === 'imagen') {
            setImagenFallida(false);
        }

        if (mensajeExito) {
            setMensajeExito(false);
        }
    };

    const handleCategoriaChange = (categoriaId: number, seleccionada: boolean) => {
        setForm((formActual) => ({
            ...formActual,
            categoriaIds: seleccionada
                ? [...formActual.categoriaIds, categoriaId]
                : formActual.categoriaIds.filter((id) => id !== categoriaId),
        }));
        setMensajeExito(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const resultado = libroSchema.safeParse(form);

        if (!resultado.success) {
            const nuevosErrores: Record<string, string> = {};
            for (const issue of resultado.error.issues) {
                const campo = String(issue.path[0]);
                if (!nuevosErrores[campo]) {
                    nuevosErrores[campo] = issue.message;
                }
            }
            setErrores(nuevosErrores);
            setMensajeExito(false);
            return;
        }

        setErrores({});
        setMensajeExito(true);
        setImagenFallida(false);
        setForm(FORM_INICIAL);
    };

    const mostrarVistaPrevia = esUrlDeImagenValida(form.imagen);

    return (
        <Fondo>
            <div className="flex justify-center items-center min-h-[70vh]">
                <form 
                    onSubmit={handleSubmit} 
                    noValidate
                    className="bg-[#1b1b1b]/95 border-4 border-[#353535] p-8 w-full max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center [text-shadow:3px_3px_0px_#000]">
                        Agregar Libro
                    </h2>

                    {mensajeExito && (
                        <div
                            role="status"
                            aria-live="polite"
                            className="mb-6 p-4 bg-green-900/40 border-2 border-[#3a971e] text-[#55ff55] font-bold text-center text-lg [text-shadow:1px_1px_0px_#000]"
                        >
                            Datos validados correctamente. Esta es una simulación local; el libro todavía no fue guardado.
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="titulo" className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">Título</label>
                        <input 
                            id="titulo"
                            type="text" 
                            name="titulo" 
                            value={form.titulo} 
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.titulo)}
                            aria-describedby={errores.titulo ? 'titulo-error' : undefined}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.titulo ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        {errores.titulo && <p id="titulo-error" role="alert" className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.titulo}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="autor" className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">Autor</label>
                        <input 
                            id="autor"
                            type="text" 
                            name="autor" 
                            value={form.autor} 
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.autor)}
                            aria-describedby={errores.autor ? 'autor-error' : undefined}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.autor ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        {errores.autor && <p id="autor-error" role="alert" className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.autor}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="precio" className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">Precio</label>
                        <input 
                            id="precio"
                            type="number" 
                            name="precio" 
                            value={form.precio} 
                            onChange={handleChange}
                            aria-invalid={Boolean(errores.precio)}
                            aria-describedby={errores.precio ? 'precio-error' : undefined}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.precio ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        {errores.precio && <p id="precio-error" role="alert" className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.precio}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="imagen" className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">URL de la imagen</label>
                        <input
                            id="imagen"
                            type="url"
                            name="imagen"
                            value={form.imagen}
                            onChange={handleChange}
                            placeholder="https://ejemplo.com/portada.jpg"
                            aria-invalid={Boolean(errores.imagen)}
                            aria-describedby={errores.imagen ? 'imagen-error' : 'imagen-ayuda'}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.imagen ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        <p id="imagen-ayuda" className="text-gray-300 text-sm mt-1">Debe comenzar con http:// o https://.</p>
                        {errores.imagen && <p id="imagen-error" role="alert" className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.imagen}</p>}

                        {mostrarVistaPrevia && !imagenFallida && (
                            <div className="mt-3 border-2 border-[#565656] bg-black/30 p-3">
                                <p className="text-white font-bold mb-2">Vista previa</p>
                                <img
                                    src={form.imagen}
                                    alt="Vista previa de la portada del libro"
                                    onLoad={() => setImagenFallida(false)}
                                    onError={() => setImagenFallida(true)}
                                    className="mx-auto h-52 max-w-full object-contain"
                                />
                            </div>
                        )}

                        {mostrarVistaPrevia && imagenFallida && (
                            <p role="alert" className="mt-3 p-3 border-2 border-red-500 bg-red-950/40 text-red-300 font-bold">
                                No se pudo cargar la imagen. Revisá la URL o probá con otra.
                            </p>
                        )}
                    </div>

                    <fieldset className="mb-6 border-2 border-[#565656] p-4">
                        <legend className="px-2 text-white font-bold [text-shadow:1px_1px_0px_#000]">Categorías</legend>
                        <p className="text-gray-300 text-sm mb-3">Podés elegir más de una. Este campo es opcional.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {CATEGORIAS_TEMPORALES.map((categoria) => {
                                const categoriaInputId = `categoria-${categoria.id}`;

                                return (
                                    <div key={categoria.id} className="flex items-center gap-3">
                                        <input
                                            id={categoriaInputId}
                                            type="checkbox"
                                            checked={form.categoriaIds.includes(categoria.id)}
                                            onChange={(event) => handleCategoriaChange(categoria.id, event.target.checked)}
                                            className="w-5 h-5 accent-[#3a971e] cursor-pointer"
                                        />
                                        <label htmlFor={categoriaInputId} className="text-white cursor-pointer">
                                            {categoria.nombre}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>

                    <div className="mb-8 flex items-center gap-3">
                        <input 
                            id="disponible"
                            type="checkbox" 
                            name="disponible" 
                            checked={form.disponible} 
                            onChange={handleChange}
                            className="w-6 h-6 accent-[#3a971e] cursor-pointer"
                        />
                        <label htmlFor="disponible" className="text-white font-bold [text-shadow:1px_1px_0px_#000] cursor-pointer">
                            Está disponible
                        </label>
                    </div>

                    <button type="submit" className="btn-minecraft w-full py-3 text-lg" style={{ backgroundImage: 'none', backgroundColor: '#3a971e' }}>
                        <span className="translate-y-1 text-white">Guardar Libro</span>
                    </button>
                </form>
            </div>
        </Fondo>
    );
}
