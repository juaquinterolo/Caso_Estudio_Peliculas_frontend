export default function TableList({ columns, data, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col) => (
            <th key={col} className="border border-gray-300 px-4 py-2">{col}</th>
          ))}
          <th className="border border-gray-300 px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col} className="border border-gray-300 px-4 py-2">
                {row[col.toLowerCase()] || "-"}
              </td>
            ))}
            <td className="border border-gray-300 px-4 py-2 flex space-x-2">
              <button
                onClick={() => onEdit(row)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(row._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
