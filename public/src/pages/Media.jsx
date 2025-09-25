import { useEffect, useState } from "react";
import {
  getMedias,
  createMedia,
  updateMedia,
  deleteMedia,
} from "../services/mediaService";

import { getGeneros } from "../services/generoService";
import { getDirectores } from "../services/directorService";
import { getProductoras } from "../services/productoraService";
import { getTipos } from "../services/tipoService";

import TableList from "../components/TableList";
import ModalForm from "../components/ModalForm";

export default function Media() {
  const [medias, setMedias] = useState([]);

  // listas para selects
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // formulario
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    serial: "",
    titulo: "",
    sinopsis: "",
    url: "",
    imagen: "",
    anioEstreno: "",
    genero: "",
    director: "",
    productora: "",
    tipo: "",
  });

  // traer datos iniciales
  const fetchData = async () => {
    const [resMedia, resGeneros, resDirectores, resProductoras, resTipos] =
      await Promise.all([
        getMedias(),
        getGeneros(),
        getDirectores(),
        getProductoras(),
        getTipos(),
      ]);

    setMedias(resMedia.data);

    // solo activos
    setGeneros(resGeneros.data.filter((g) => g.estado));
    setDirectores(resDirectores.data.filter((d) => d.estado));
    setProductoras(resProductoras.data.filter((p) => p.estado));
    setTipos(resTipos.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // crear o actualizar
  const handleSubmit = async () => {
    if (editing) {
      await updateMedia(editing._id, formData);
    } else {
      await createMedia(formData);
    }
    setShowForm(false);
    setEditing(null);
    resetForm();
    fetchData();
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar esta media?")) {
      await deleteMedia(id);
      fetchData();
    }
  };

  const resetForm = () => {
    setFormData({
      serial: "",
      titulo: "",
      sinopsis: "",
      url: "",
      imagen: "",
      anioEstreno: "",
      genero: "",
      director: "",
      productora: "",
      tipo: "",
    });
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Media (Películas y Series)</h1>
        <button
          onClick={() => {
            resetForm();
            setEditing(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo
        </button>
      </div>

      <TableList
        columns={["Serial", "Titulo", "AnioEstreno"]}
        data={medias.map((m) => ({
          ...m,
          serial: m.serial,
          titulo: m.titulo,
          anioestreno: m.anioEstreno,
        }))}
        onEdit={(row) => {
          setEditing(row);
          setFormData({
            serial: row.serial,
            titulo: row.titulo,
            sinopsis: row.sinopsis,
            url: row.url,
            imagen: row.imagen,
            anioEstreno: row.anioEstreno,
            genero: row.genero?._id || "",
            director: row.director?._id || "",
            productora: row.productora?._id || "",
            tipo: row.tipo?._id || "",
          });
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {showForm && (
        <ModalForm
          title={editing ? "Editar Media" : "Nueva Media"}
          fields={[
            { name: "serial", label: "Serial", required: true },
            { name: "titulo", label: "Título", required: true },
            { name: "sinopsis", label: "Sinopsis" },
            { name: "url", label: "URL de la Película", required: true },
            { name: "imagen", label: "Imagen de portada" },
            { name: "anioEstreno", label: "Año de estreno", type: "number" },
            {
              name: "genero",
              label: "Género",
              type: "select",
              options: generos.map((g) => ({ value: g._id, label: g.nombre })),
            },
            {
              name: "director",
              label: "Director",
              type: "select",
              options: directores.map((d) => ({ value: d._id, label: d.nombres })),
            },
            {
              name: "productora",
              label: "Productora",
              type: "select",
              options: productoras.map((p) => ({ value: p._id, label: p.nombre })),
            },
            {
              name: "tipo",
              label: "Tipo",
              type: "select",
              options: tipos.map((t) => ({ value: t._id, label: t.nombre })),
            },
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
