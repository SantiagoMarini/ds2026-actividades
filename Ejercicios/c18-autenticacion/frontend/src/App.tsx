import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home';
import { Catalogo } from './pages/Catalogo';
import { LibroDetalle } from './pages/LibroDetalle';
import { ContactoTemporal } from './pages/ContactoTemporal';
import { LibroNuevo } from './pages/LibroNuevo';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/contacto" element={<ContactoTemporal />} />
          <Route path="/libros/:id" element={<LibroDetalle/>} />
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;