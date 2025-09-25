import { useEffect, useState } from "react";
import { getGeneros, createGenero, deleteGenero } from "../services/generoService";

export default function Genero() {
  const [generos, setGeneros] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const cargarGeneros = async () => {
    const res = await getGeneros();
    setGeneros(res.data);
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createGenero({ nombre, descripcion });
    setNombre("");
    setDescripcion("");
    cargarGeneros();
  };

  const handleDelete = async (id) => {
    await deleteGenero(id);
    cargarGeneros();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Módulo Género</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Crear
        </button>
      </form>

      {/* Listado */}
      <ul>
        {generos.map((g) => (
          <li key={g._id} className="flex justify-between border-b py-2">
            <span>{g.nombre} - {g.descripcion}</span>
            <button onClick={() => handleDelete(g._id)} className="bg-red-500 text-white p-1 px-2">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}