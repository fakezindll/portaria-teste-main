import { useState } from "react";
import {
  Plus,
  Trash2,
  User,
  CheckCircle,
  XCircle
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import Reason from "../components/Reason";
import VisitorDetails from "../components/VisitorDetails";

function Visitors() {
  const [visitantes, setVisitantes] = useState([
    {
      name: "Ana",
      doc: "RG 45.678.123-0",
      vehicle: "ABC-1234",
      entry: false
    },
    {
      name: "Bruno",
      doc: "CNH 987654321",
      vehicle: "XYZ-9876",
      purpose: "Entrega",
      empresa: "Correios",
      entry: true,
      entryTime: "09:15"
    },
    {
      name: "Clara",
      doc: "RG 33.555.111-9",
      vehicle: "KLM-4532",
      entry: false
    }
  ]);

  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [search, setSearch] = useState("");
  const [actionType, setActionType] = useState("");
  const [reasonModal, setReasonModal] = useState(false);
  const [showVisitor, setShowVisitor] = useState(false);

  const OpenVisitorDetail = (visitor) => {
    setSelectedVisitor(visitor);
    setShowVisitor(true);
  };

  const openReasonModal = (visitor) => {
    setSelectedVisitor(visitor);
    setReasonModal(true);
  };

  const handleOpenModal = (visitor, action) => {
    setSelectedVisitor(visitor);
    setActionType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedVisitor) return;

    if (actionType === "saida") {
      setVisitantes((prev) =>
        prev.map((v) =>
          v.name === selectedVisitor.name
            ? {
                ...v,
                entry: false,
                entryTime: null,
                purpose: null,
                empresa: null
              }
            : v
        )
      );
    } else if (actionType === "delete") {
      setVisitantes((prev) =>
        prev.filter((v) => v.name !== selectedVisitor.name)
      );
    }

    setShowModal(false);
    setSelectedVisitor(null);
  };

  const handleReasonConfirm = (title, description, empresa) => {
    const horaAtual = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    setVisitantes((prev) =>
      prev.map((v) =>
        v.name === selectedVisitor.name
          ? {
              ...v,
              entry: true,
              purpose: title,
              description,
              empresa,
              entryTime: horaAtual
            }
          : v
      )
    );

    setReasonModal(false);
    setSelectedVisitor(null);
  };

  const filtered = visitantes.filter(
    (v) =>
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      (v.doc && v.doc.toLowerCase().includes(search.toLowerCase())) ||
      (v.vehicle && v.vehicle.toLowerCase().includes(search.toLowerCase()))
  );

  const visitantesAusentes = filtered.filter((v) => !v.entry);
  const visitantesPresentes = filtered.filter((v) => v.entry);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 transition-all duration-300">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Visitantes
            </h1>
            <p className="text-gray-600 mb-4">
              Controle de entrada e saída de visitantes
            </p>
          </div>
          <Link
            className="flex items-center hover:bg-blue-900 px-5 py-2 rounded-2xl bg-blue-600 text-white font-semibold cursor-pointer m-3"
            to="/adicionarvisitante"
          >
            <Plus className="mr-2" /> Adicionar Visitante
          </Link>
        </div>

        <div className="m-5 w-[1000px] rounded-md">
          <InputSearch
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, documento ou veículo"
          />

          {/* === PRESENTES === */}
          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-2">
            Visitantes Presentes
          </h2>

          <div className="grid grid-cols-6 bg-gray-200 p-3 font-semibold text-gray-700 my-2">
            <div>Nome</div>
            <div>Horário de Entrada</div>
            <div>Motivo</div>
            <div>Empresa</div>
            <div>Status</div>
            <div className="text-center">Ações</div>
          </div>

          {visitantesPresentes.length > 0 ? (
            visitantesPresentes.map((v, index) => (
              <div
                key={index}
                onClick={() => OpenVisitorDetail(v)}
                className="group grid grid-cols-6 items-center p-3 bg-white rounded-md transform transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                    <User size={20} />
                  </div>
                  <p className="font-medium">{v.name}</p>
                </div>
                <p>{v.entryTime || "--:--"}</p>
                <p>{v.purpose || "—"}</p>
                <p>{v.empresa || "—"}</p>
                <div className="flex items-center gap-2">
                  <CheckCircle
                    size={20}
                    className="text-green-500 group-hover:text-white transition-all duration-300"
                  />
                  <span>Presente</span>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(v, "saida");
                    }}
                    className="flex items-center cursor-pointer px-3 py-1 rounded text-white font-semibold bg-red-500 hover:bg-red-600"
                  >
                    Saída
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-3">Nenhum visitante presente.</p>
          )}

          {/* === AUSENTES === */}
          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">
            Visitantes Registrados
          </h2>

          <div className="grid grid-cols-6 bg-gray-200 p-3 font-semibold text-gray-700 my-2">
            <div>Nome</div>
            <div>Documento</div>
            <div>Veículo</div>
            <div>Empresa</div>
            <div>Status</div>
            <div className="text-center">Ações</div>
          </div>

          {visitantesAusentes.length > 0 ? (
            visitantesAusentes.map((v, index) => (
              <div
                key={index}
                onClick={() => OpenVisitorDetail(v)}
                className="group grid grid-cols-6 items-center p-3 bg-white rounded-md transform transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                    <User size={20} />
                  </div>
                  <p className="font-medium">{v.name}</p>
                </div>
                <p>{v.doc}</p>
                <p>{v.vehicle}</p>
                <p>{v.empresa || "—"}</p>
                <div className="flex items-center gap-2">
                  <XCircle
                    size={20}
                    className="text-red-500 group-hover:text-white transition-all duration-300"
                  />
                  <span>Ausente</span>
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openReasonModal(v);
                    }}
                    className="flex cursor-pointer items-center px-3 py-1 rounded text-white font-semibold bg-green-500 hover:bg-green-600"
                  >
                    Entrada
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(v, "delete");
                    }}
                    className="text-red-600 group-hover:text-white transition-all duration-300 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-3">
              Nenhum visitante aguardando entrada.
            </p>
          )}
        </div>
      </main>

      {reasonModal && selectedVisitor && (
        <Reason
          show={reasonModal}
          func={selectedVisitor}
          onClose={() => setReasonModal(false)}
          onConfirm={handleReasonConfirm}
        />
      )}

      {selectedVisitor && (
        <ConfirmModal
          show={showModal}
          func={selectedVisitor}
          onClose={() => setShowModal(false)}
          onConfirm={confirmAction}
          text={
            actionType === "saida"
              ? `Deseja marcar a saída de ${selectedVisitor.name}?`
              : `Deseja realmente apagar o registro de ${selectedVisitor.name}?`
          }
          title={
            actionType === "saida"
              ? "Confirmar Saída"
              : "Apagar Visitante"
          }
          color={actionType === "delete" ? "#EF4444" : undefined}
        />
      )}

      {showVisitor && selectedVisitor && (
        <VisitorDetails
          show={showVisitor}
          visitor={selectedVisitor}
          onClose={() => setShowVisitor(false)}
        />
      )}
    </div>
  );
}

export default Visitors;