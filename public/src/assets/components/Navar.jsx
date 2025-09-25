import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <ul className="flex space-x-6">
        <li><Link to="/generos">Géneros</Link></li>
        <li><Link to="/directores">Directores</Link></li>
        <li><Link to="/productoras">Productoras</Link></li>
        <li><Link to="/tipos">Tipos</Link></li>
        <li><Link to="/media">Media</Link></li>
      </ul>
    </nav>
  );
}
