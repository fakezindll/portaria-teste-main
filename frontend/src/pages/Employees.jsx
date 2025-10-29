import { Plus, Edit, Trash2, User } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import InputSearch from "../components/InputSearch";
import EmployeeDetails from "../components/EmployeeDetails";
import { listarFuncionarios, deletarFuncionario } from "../services/funcionarios";

function Employees() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await listarFuncionarios();
        setFuncionarios(data);
      } catch (err) {
        console.error("Erro ao listar funcionários:", err);
        alert("Erro ao carregar funcionários.");
      }
    };
    fetchData();
  }, []);

  const openDetails = (func) => {
    setSelectedFunc(func);
    setShowDetails(true);
  };

  const handleDelete = async (func) => {
    try {
      await deletarFuncionario(func.id);
      setFuncionarios((prev) => prev.filter((f) => f.id !== func.id));
      setShowModal(false);
      setShowDetails(false);
    } catch (err) {
      console.error("Erro ao deletar funcionário:", err);
      alert("Não foi possível deletar o funcionário.");
    }
  };

  const filteredFuncionarios = funcionarios.filter(
    (f) =>
      f.nome.toLowerCase().includes(search.toLowerCase()) ||
      f.documento.includes(search) ||
      f.veiculos.some((v) => v.placa.includes(search))
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 transition-all duration-300">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Funcionários</h1>
            <p className="text-gray-600 mb-4">Gerencie os colaboradores da empresa</p>
          </div>

          <Link
            className="flex items-center hover:bg-blue-900 px-5 py-2 rounded-2xl bg-blue-600 text-white font-semibold cursor-pointer"
            to="/adicionarfuncionario"
          >
            <Plus className="mr-2" /> Adicionar Funcionário
          </Link>
        </div>

        <InputSearch
          placeholder="Buscar por nome, CPF ou placa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-4 bg-gray-200 p-3 font-semibold text-gray-700 my-2 rounded-t-md">
          <div>Nome</div>
          <div>CPF</div>
          <div>Veículos</div>
          <div className="text-center">Ações</div>
        </div>

        {filteredFuncionarios.length > 0 ? (
          filteredFuncionarios.map((f) => (
            <div
              key={f.id}
              className="group grid grid-cols-4 items-center p-3 bg-white cursor-pointer rounded-md
                         transform transition-all duration-300 hover:bg-blue-600 hover:text-white hover:scale-[1.02] hover:shadow-lg"
              onClick={() => openDetails(f)}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white
                                transition-all duration-300 group-hover:bg-white group-hover:text-blue-600">
                  <User size={20} />
                </div>
                <p className="font-medium transition-all duration-300">{f.nome}</p>
              </div>

              <p>{f.documento}</p>
              <p>{f.veiculos.map((v) => v.placa).join(", ")}</p>

              <div className="flex justify-center">
                <Link
                  to={`/editar/${f.id}`}
                  className="text-blue-600 mr-3 flex items-center transition-all duration-300 group-hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFunc(f);
                    setShowModal(true);
                  }}
                  className="text-red-600 group-hover:text-white transition-all duration-300 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">Nenhum funcionário cadastrado.</p>
        )}

        {selectedFunc && (
          <ConfirmModal
            show={showModal}
            func={selectedFunc}
            onClose={() => setShowModal(false)}
            onConfirm={() => handleDelete(selectedFunc)}
            text={`Deseja realmente apagar ${selectedFunc?.nome}?`}
            color="#EF4444"
            title="Apagar Funcionário"
          />
        )}

        {selectedFunc && (
          <EmployeeDetails
            show={showDetails}
            func={selectedFunc}
            onClose={() => setShowDetails(false)}
            onDelete={(func) => {
              setSelectedFunc(func);
              setShowModal(true);
            }}
          />
        )}
      </main>
    </div>
  );
}

export default Employees;
