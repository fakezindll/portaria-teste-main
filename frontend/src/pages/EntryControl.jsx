import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";
import InputSearch from "../components/InputSearch";
import { listarFuncionarios } from "../services/funcionarios";
import {
  registrarEntrada,
  registrarSaida,
  listarEntradasAtivas,
} from "../services/portaria";

export default function EntryControl() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  // 🔹 Buscar funcionários + entradas ativas do backend
  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const [funcs, ativos] = await Promise.all([
          listarFuncionarios(),
          listarEntradasAtivas(),
        ]);

        // Marca entry: true para os IDs retornados como ativos
        const data = funcs.map((f) => ({
          ...f,
          entry: ativos.includes(f.id),
        }));

        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchFuncionarios();
  }, []);

  // 🔹 Abre modal de confirmação
  const handleOpenModal = (func) => {
    setSelectedFunc(func);
    setShowModal(true);
  };

  // 🔹 Confirma entrada ou saída
  const confirmEntryToggle = async () => {
    if (!selectedFunc) return;

    try {
      if (selectedFunc.entry) {
        await registrarSaida(selectedFunc.documento);
      } else {
        await registrarEntrada(selectedFunc.documento);
      }

      // Atualiza estado local
      const updated = funcionarios.map((f) =>
        f.documento === selectedFunc.documento
          ? { ...f, entry: !f.entry }
          : f
      );

      setFuncionarios(updated);
      setShowModal(false);
      setSelectedFunc(null);
    } catch (error) {
      console.error("Erro ao registrar entrada/saída:", error);
      alert(
        error.response?.data?.message ||
          "Erro ao registrar entrada/saída. Tente novamente."
      );
    }
  };

  // 🔹 Filtro de busca
  const filtered = funcionarios
    .filter(
      (f) =>
        f.nome.toLowerCase().includes(search.toLowerCase()) ||
        f.documento.includes(search)
    )
    .sort((a, b) => Number(a.entry) - Number(b.entry));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Controle de Entrada
        </h1>
        <p className="text-gray-600 mb-4">
          Registre entrada e saída de funcionários
        </p>

        <InputSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou CPF"
        />

        <div className="flex flex-col gap-2">
          {filtered.map((f, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
            >
              <div className="flex items-center gap-2">
                {f.entry ? (
                  <CheckCircle size={20} className="text-green-500" />
                ) : (
                  <XCircle size={20} className="text-red-500" />
                )}
                <div>
                  <span className="font-medium">{f.nome}</span>
                  <p className="text-gray-500 text-sm">{f.documento}</p>
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(f)}
                className={`flex items-center px-3 py-1 rounded text-white font-semibold cursor-pointer ${
                  f.entry
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {f.entry ? "Saída" : "Entrada"}
              </button>
            </div>
          ))}
        </div>
      </main>

      {selectedFunc && (
        <ConfirmModal
          show={showModal}
          func={selectedFunc}
          onClose={() => setShowModal(false)}
          onConfirm={confirmEntryToggle}
          text={`Deseja marcar ${
            selectedFunc.entry ? "saída" : "entrada"
          } de ${selectedFunc.nome}?`}
          title={`Confirmar ${
            selectedFunc.entry ? "Saída" : "Entrada"
          }`}
        />
      )}
    </div>
  );
}
