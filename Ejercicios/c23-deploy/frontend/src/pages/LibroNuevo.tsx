import { useEffect, useState } from 'react';
import { Fondo } from '../components/Fondo';
import { libroSchema } from '../schemas/libroSchema';
import { crearLibro } from '../services/libros';
import { obtenerAutores, obtenerCategorias } from '../services/catalogos';
import type { Autor } from '../types/autor';
import type { Categoria } from '../types/categoria';
import { useNavigate } from 'react-router-dom';

type FormLibro = {
    titulo: string;
    autorId: string;
    precio: string;
    imagen: string;
    disponible: boolean;
    categoriaIds: number[];
};

const FORM_INICIAL: FormLibro = { titulo: '', autorId: '', precio: '', imagen: '', disponible: true, categoriaIds: [] };

export function LibroNuevo() {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormLibro>(FORM_INICIAL);
    const [autores, setAutores] = useState<Autor[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [errores, setErrores] = useState<Record<string, string>>({});
    const [mensaje, setMensaje] = useState('');
    const [guardando, setGuardando] = useState(false);
    const [imagenFallida, setImagenFallida] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        Promise.all([obtenerAutores(controller.signal), obtenerCategorias(controller.signal)])
            .then(([autoresApi, categoriasApi]) => {
                setAutores(autoresApi);
                setCategorias(categoriasApi);
            })
            .catch((cause: unknown) => {
                if (!controller.signal.aborted) setMensaje(cause instanceof Error ? cause.message : 'No se pudieron cargar autores y categorías.');
            });
        return () => controller.abort();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        const checked = event.target instanceof HTMLInputElement && event.target.checked;
        setForm((actual) => ({ ...actual, [name]: event.target instanceof HTMLInputElement && event.target.type === 'checkbox' ? checked : value }));
        if (name === 'imagen') setImagenFallida(false);
    };

    const handleCategoria = (id: number, seleccionada: boolean) => {
        setForm((actual) => ({
            ...actual,
            categoriaIds: seleccionada ? [...actual.categoriaIds, id] : actual.categoriaIds.filter((categoriaId) => categoriaId !== id),
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const resultado = libroSchema.safeParse(form);
        if (!resultado.success) {
            const nuevosErrores: Record<string, string> = {};
            resultado.error.issues.forEach((issue) => { nuevosErrores[String(issue.path[0])] ??= issue.message; });
            setErrores(nuevosErrores);
            setMensaje('');
            return;
        }
        setGuardando(true);
        setErrores({});
        try {
            const libro = await crearLibro(resultado.data);
            setMensaje(`Se creó "${libro.titulo}" correctamente.`);
            setForm(FORM_INICIAL);
            navigate('/catalogo');
        } catch (cause: unknown) {
            setMensaje(cause instanceof Error ? cause.message : 'No se pudo crear el libro.');
        } finally {
            setGuardando(false);
        }
    };

    return <Fondo><div className="flex justify-center items-center min-h-[70vh]">
        <form onSubmit={handleSubmit} noValidate className="bg-[#1b1b1b]/95 border-4 border-[#353535] p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Agregar Libro</h2>
            {mensaje && <p role="status" className="mb-6 p-4 border-2 border-yellow-300 text-yellow-200 text-center">{mensaje}</p>}
            <Campo etiqueta="Título" nombre="titulo" valor={form.titulo} error={errores.titulo} onChange={handleChange} />
            <label htmlFor="autorId" className="block text-white mb-2 font-bold">Autor</label>
            <select id="autorId" name="autorId" value={form.autorId} onChange={handleChange} className="w-full bg-[#353535] text-white p-3 border-2 mb-4">
                <option value="">Seleccioná un autor</option>
                {autores.map((autor) => <option key={autor.id} value={autor.id}>{autor.nombre}</option>)}
            </select>
            {errores.autorId && <p role="alert" className="text-red-400 mb-4">{errores.autorId}</p>}
            <Campo etiqueta="Precio" nombre="precio" valor={form.precio} error={errores.precio} tipo="number" onChange={handleChange} />
            <Campo etiqueta="URL de la imagen" nombre="imagen" valor={form.imagen} error={errores.imagen} tipo="url" onChange={handleChange} />
            {form.imagen && !imagenFallida && (
                <div className="mb-5 border-2 border-[#565656] bg-black/30 p-3">
                    <p className="text-white font-bold mb-2">Vista previa</p>
                    <img src={form.imagen} alt="Vista previa de la portada" onError={() => setImagenFallida(true)} className="mx-auto h-52 max-w-full object-contain" />
                </div>
            )}
            {imagenFallida && <p role="alert" className="mb-5 p-3 border-2 border-red-500 text-red-300">No se pudo cargar la imagen. Revisá la URL.</p>}
            <fieldset className="mb-6 border-2 border-[#565656] p-4">
                <legend className="px-2 text-white font-bold">Categorías</legend>
                {categorias.map((categoria) => <label key={categoria.id} className="flex items-center gap-3 text-white mb-2">
                    <input type="checkbox" checked={form.categoriaIds.includes(categoria.id)} onChange={(event) => handleCategoria(categoria.id, event.target.checked)} />
                    {categoria.nombre}
                </label>)}
            </fieldset>
            <label className="mb-8 flex items-center gap-3 text-white font-bold">
                <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} /> Está disponible
            </label>
            <button disabled={guardando} type="submit" className="btn-minecraft w-full py-3 text-lg disabled:opacity-60">{guardando ? 'Guardando...' : 'Guardar Libro'}</button>
        </form>
    </div></Fondo>;
}

type CampoProps = {
    etiqueta: string;
    nombre: keyof Pick<FormLibro, 'titulo' | 'precio' | 'imagen'>;
    valor: string;
    error?: string;
    tipo?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Campo({ etiqueta, nombre, valor, error, tipo = 'text', onChange }: CampoProps) {
    return <div className="mb-4">
        <label htmlFor={nombre} className="block text-white mb-2 font-bold">{etiqueta}</label>
        <input id={nombre} type={tipo} name={nombre} value={valor} onChange={onChange} aria-invalid={Boolean(error)} aria-describedby={error ? `${nombre}-error` : undefined} className="w-full bg-[#353535] text-white p-3 border-2" />
        {error && <p id={`${nombre}-error`} role="alert" className="text-red-400 mt-1">{error}</p>}
    </div>;
}
