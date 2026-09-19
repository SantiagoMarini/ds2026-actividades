import { useState } from 'react';
import { Fondo } from '../components/Fondo';
import { libroSchema } from '../schemas/libroSchema';

export function LibroNuevo() {
    const [form, setForm] = useState({ 
        titulo: '', 
        autor: '', 
        precio: '', 
        disponible: true 
    });

    const [errores, setErrores] = useState<Record<string, string>>({});
    // Nuevo estado para controlar el mensaje de exito
    const [mensajeExito, setMensajeExito] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        
        // Si el usuario empieza a escribir otro libro, ocultamos el cartel de éxito
        if (mensajeExito) {
            setMensajeExito(false);
        }
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
            setMensajeExito(false); // Por si había un éxito previo, lo sacamos
            return;
        }

        // Si pasa la validación:
        setErrores({}); // Limpiamos errores por las dudas
        setMensajeExito(true); // Mostramos el cartel verde
        
        // Vaciamos el formulario para que quede listo para otro libro
        setForm({
            titulo: '',
            autor: '',
            precio: '',
            disponible: true
        });
    };

    return (
        <Fondo>
            <div className="flex justify-center items-center min-h-[70vh]">
                <form 
                    onSubmit={handleSubmit} 
                    className="bg-[#1b1b1b]/95 border-4 border-[#353535] p-8 w-full max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center [text-shadow:3px_3px_0px_#000]">
                        Agregar Libro
                    </h2>

                    {/* CARTEL DE ÉXITO VERDE */}
                    {mensajeExito && (
                        <div className="mb-6 p-4 bg-green-900/40 border-2 border-[#3a971e] text-[#55ff55] font-bold text-center text-xl [text-shadow:1px_1px_0px_#000]">
                            ¡Libro guardado con éxito!
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">Título</label>
                        <input 
                            type="text" 
                            name="titulo" 
                            value={form.titulo} 
                            onChange={handleChange}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.titulo ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        {errores.titulo && <p className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.titulo}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">Autor</label>
                        <input 
                            type="text" 
                            name="autor" 
                            value={form.autor} 
                            onChange={handleChange}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.autor ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        {errores.autor && <p className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.autor}</p>}
                    </div>


                    <div className="mb-6">
                        <label className="block text-white mb-2 font-bold [text-shadow:1px_1px_0px_#000]">Precio</label>
                        <input 
                            type="number" 
                            name="precio" 
                            value={form.precio} 
                            onChange={handleChange}
                            className={`w-full bg-[#353535] text-white p-3 border-2 focus:outline-none ${errores.precio ? 'border-red-500' : 'border-[#1b1b1b]'}`}
                        />
                        {errores.precio && <p className="text-red-400 font-bold mt-1 [text-shadow:1px_1px_0px_#000]">{errores.precio}</p>}
                    </div>

                    <div className="mb-8 flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            name="disponible" 
                            checked={form.disponible} 
                            onChange={handleChange}
                            className="w-6 h-6 accent-[#3a971e] cursor-pointer"
                        />
                        <label className="text-white font-bold [text-shadow:1px_1px_0px_#000] cursor-pointer">
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