import { useEffect, useState } from "react";
import {
  getProductoras,
  createProductora,
  updateProductora,
  deleteProductora,
} from "../services/productoraService";
import TableList from "../components/TableList";
import ModalForm from "../components/ModalForm";

export default function Productoras() {
  const [productoras, setProductoras] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    estado: true,
    slogan: "",
    descripcion: "",
  });

  const fetchProductoras = async () => {
    const res = await getProductoras();
    setProductoras(res.data);
  };

  useEffect(() => {
    fetchProductoras();
  }, []);

  const handleSubmit = async () => {
    if (editing) {
      await updateProductora(editing._id, formData);
    } else {
      await createProductora(formData);
    }
    setShowForm(false);
    setEditing(null);
    setFormData({ nombre: "", estado: true, slogan: "", descripcion: "" });
    fetchProductoras();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar esta productora?")) {
      await deleteProductora(id);
      fetchProductoras();
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Productoras</h1>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nueva
        </button>
      </div>

      <TableList
        columns={["Nombre", "Estado", "Slogan"]}
        data={productoras.map((p) => ({
          ...p,
          estado: p.estado ? "Activo" : "Inactivo",
        }))}
        onEdit={(row) => {
          setEditing(row);
          setFormData({
            nombre: row.nombre,
            estado: row.estado === "Activo",
            slogan: row.slogan || "",
            descripcion: row.descripcion || "",
          });
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <ModalForm
          title={editing ? "Editar Productora" : "Nueva Productora"}
          fields={[
            { name: "nombre", label: "Nombre", required: true },
            {
              name: "estado",
              label: "Estado",
              type: "select",
              options: [
                { value: true, label: "Activo" },
                { value: false, label: "Inactivo" },
              ],
            },
            { name: "slogan", label: "Slogan" },
            { name: "descripcion", label: "Descripción" },
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