export function Spinner() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center bg-[#171717]" role="status" aria-live="polite">
            <div className="flex flex-col items-center gap-5 border-4 border-[#565656] bg-black/40 p-8 text-white">
                <span className="h-12 w-12 animate-spin border-8 border-[#565656] border-t-[#45b323] [image-rendering:pixelated]" aria-hidden="true" />
                <span>Cargando sesión...</span>
            </div>
        </div>
    );
}
