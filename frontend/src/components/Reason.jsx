import { useState } from "react";

export default function Reason({ show, func, onClose, onConfirm }) {
  if (!show) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [empresa, setEmpresa] = useState("");

  const handleConfirm = () => {
    if (!title.trim()) {
      alert("Por favor, preencha o motivo da visita.");
      return;
    }
    onConfirm(title, description, empresa); // envia também a empresa (pode ser vazia)
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-[500px] rounded-2xl shadow-xl p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Registrar Entrada
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Motivo da Visita *
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Entrega, Reunião, Visita técnica..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Descrição</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detalhes adicionais (opcional)"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Novo campo: Empresa */}
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Empresa</p>
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Ex: Load Cargo Logísticas"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}