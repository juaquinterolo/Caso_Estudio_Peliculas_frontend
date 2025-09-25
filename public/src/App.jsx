import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Genero from "./pages/Genero";
import Director from "./pages/Director";
import Productora from "./pages/Productora";
import Tipo from "./pages/Tipo";
import Media from "./pages/Media";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/generos">Géneros</Link>
        <Link to="/directores">Directores</Link>
        <Link to="/productoras">Productoras</Link>
        <Link to="/tipos">Tipos</Link>
        <Link to="/media">Media</Link>
      </nav>

      <Routes>
        <Route path="/generos" element={<Genero />} />
        <Route path="/directores" element={<Director />} />
        <Route path="/productoras" element={<Productora />} />
        <Route path="/tipos" element={<Tipo />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
