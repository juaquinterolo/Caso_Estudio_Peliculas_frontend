export default function ModalForm({ title, fields, values, onChange, onSubmit, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          {fields.map((f) => (
            <div key={f.name} className="mb-3">
              <label className="block mb-1">{f.label}</label>
              {f.type === "select" ? (
                <select
                  name={f.name}
                  value={values[f.name] || ""}
                  onChange={onChange}
                  className="w-full border px-3 py-2 rounded"
                  required={f.required}
                >
                  <option value="">Seleccione...</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type || "text"}
                  name={f.name}
                  value={values[f.name] || ""}
                  onChange={onChange}
                  className="w-full border px-3 py-2 rounded"
                  required={f.required}
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-400 text-white rounded">
              Cancelar
            </button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
