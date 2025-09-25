import { useEffect, useState } from "react";
import {
  getDirectores,
  createDirector,
  updateDirector,
  deleteDirector,
} from "../services/directorService";
import TableList from "../components/TableList";
import ModalForm from "../components/ModalForm";

export default function Directores() {
  const [directores, setDirectores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ nombres: "", estado: true });

  const fetchDirectores = async () => {
    const res = await getDirectores();
    setDirectores(res.data);
  };

  useEffect(() => {
    fetchDirectores();
  }, []);

  const handleSubmit = async () => {
    if (editing) {
      await updateDirector(editing._id, formData);
    } else {
      await createDirector(formData);
    }
    setShowForm(false);
    setEditing(null);
    setFormData({ nombres: "", estado: true });
    fetchDirectores();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este director?")) {
      await deleteDirector(id);
      fetchDirectores();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Directores</h1>
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
        columns={["Nombres", "Estado"]}
        data={directores.map((d) => ({
          ...d,
          nombres: d.nombres,
          estado: d.estado ? "Activo" : "Inactivo",
        }))}
        onEdit={(row) => {
          setEditing(row);
          setFormData({ nombres: row.nombres, estado: row.estado === "Activo" });
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <ModalForm
          title={editing ? "Editar Director" : "Nuevo Director"}
          fields={[
            { name: "nombres", label: "Nombres", required: true },
            {
              name: "estado",
              label: "Estado",
              type: "select",
              options: [
                { value: true, label: "Activo" },
                { value: false, label: "Inactivo" },
              ],
            },
          ]}
          values={formData}
          onChange={(e) => {
            const value =
              e.target.type === "select-one"
                ? e.target.value === "true"
                : e.target.value;
            setFormData({ ...formData, [e.target.name]: value });
          }}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}