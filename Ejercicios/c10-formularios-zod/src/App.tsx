import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { ContactoTemporal } from './pages/ContactoTemporal';
import { LibroNuevo } from './pages/LibroNuevo';
import { type Libro } from './types/libro';

function App() {
  // Estado global para los libros creados manualmente
    const [librosPropios, setLibrosPropios] = useState<Libro[]>([]);

  // Función que viaja por props para agregar sin mutar el array original
  const agregarLibro = (nuevo: Libro) => {
      setLibrosPropios([...librosPropios, nuevo]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Le pasamos los libros que damos de alta al Catalogo para que los mezcle con la API */}
          <Route path="/catalogo" element={<Catalogo librosPropios={librosPropios} />} />
          <Route path="/contacto" element={<ContactoTemporal />} />
          <Route path="/libros/:id" element={<LibroDetalle/>} />
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;