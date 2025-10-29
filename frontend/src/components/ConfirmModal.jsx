export default function ConfirmModal({ show, onClose, onConfirm, func, text, color, title }) {
  if (!show || !func) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {title}
        </h2>
        <p className="mb-6">
          {text}
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded text-white font-semibold cursor-pointer transition-colors ${
              func.entry ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
             style={{ backgroundColor: color }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
