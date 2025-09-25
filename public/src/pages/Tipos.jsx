import { useEffect, useState } from "react";
import {
  getTipos,
  createTipo,
  updateTipo,
  deleteTipo,
} from "../services/tipoService";
import TableList from "../components/TableList";
import ModalForm from "../components/ModalForm";

export default function Tipos() {
  const [tipos, setTipos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  });

  const fetchTipos = async () => {
    const res = await getTipos();
    setTipos(res.data);
  };

  useEffect(() => {
    fetchTipos();
  }, []);

  const handleSubmit = async () => {
    if (editing) {
      await updateTipo(editing._id, formData);
    } else {
      await createTipo(formData);
    }
    setShowForm(false);
    setEditing(null);
    setFormData({ nombre: "", descripcion: "" });
    fetchTipos();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este tipo?")) {
      await deleteTipo(id);
      fetchTipos();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tipos (Película/Serie)</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo
        </button>
      </div>

      <TableList
        columns={["Nombre", "Descripcion"]}
        data={tipos}
        onEdit={(row) => {
          setEditing(row);
          setFormData({ nombre: row.nombre, descripcion: row.descripcion });
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <ModalForm
          title={editing ? "Editar Tipo" : "Nuevo Tipo"}
          fields={[
            { name: "nombre", label: "Nombre", required: true },
            { name: "descripcion", label: "Descripción" },
          ]}
          values={formData}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
