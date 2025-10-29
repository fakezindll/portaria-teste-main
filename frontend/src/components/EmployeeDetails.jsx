import { ArrowLeft, User, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardDetails from "./CardDetails";
import BarGraph from "./graphs/BarGraph";
import PieGraph from "./graphs/PieGraph";
import VehicleDetails from "./VehicleDetails";

function EmployeeDetails({ show, onClose, func, onDelete }) {
  const navigate = useNavigate();
  const [mostrarVeiculos, setMostrarVeiculos] = useState(false);

  if (!show) return null;

  const handleEdit = () => {
    navigate(`/editar?cpf=${encodeURIComponent(func.cpf)}`);
  };

  const handleOpenVehicles = () => setMostrarVeiculos(true);
  const handleBackToDetails = () => setMostrarVeiculos(false);

  const presencaData = [
    { dia: "Seg", horas: 8 },
    { dia: "Ter", horas: 6 },
    { dia: "Qua", horas: 9 },
    { dia: "Qui", horas: 7 },
    { dia: "Sex", horas: 10 },
    { dia: "Sab", horas: 6 },
  ];

  const presencaDistribuicao = [
    { name: "Presente", value: 18 },
    { name: "Atrasos", value: 2 },
    { name: "Faltou", value: 1 },
  ];

    const handleClose = () => {
    setMostrarVeiculos(false); 
    onClose(); 
    };


  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/50"
      onClick={handleClose}
    >

      <div
        className="relative w-[1200px] h-[700px] bg-gray-100 rounded shadow overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {!mostrarVeiculos ? (
            <motion.div
              key="detalhes"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex w-full h-full select-none "
            >
             
              <div className="w-[400px] flex flex-col space-y-4 p-4 pr-0 h-full">
                
                <div className="flex space-x-4 items-center h-[60px] bg-white rounded shadow px-2">
                  <button
                    className="flex justify-center w-8 h-8 items-center cursor-pointer border border-gray-300 rounded-full transform transition-transform duration-100 hover:scale-125"
                    onClick={onClose}
                  >
                    <ArrowLeft />
                  </button>
                  <h1 className="text-2xl">Detalhes</h1>
                </div>

              
                <div className="bg-white rounded shadow flex-1 flex flex-col justify-between overflow-hidden">
                
                  <div className="border border-gray-200 rounded w-full h-[200px] flex justify-center items-center text-center mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                        <User className="w-10 h-10 text-gray-500" />
                      </div>
                      <h1 className="font-bold text-lg">{func.name}</h1>
                      <p className="text-gray-500">Funcionário</p>
                    </div>
                  </div>

                 
                  <div className="px-4">
                    <p className="text-gray-600 font-bold">Informações</p>
                       <div className="space-y-3 border-1 border-b-0 border-gray-200 rounded pt-2">
                    
                      <CardDetails title="Nome" info={func.name} />
                      <CardDetails title="Documento" info={func.cpf} />


                      <div
                        onClick={handleOpenVehicles}
                        className="flex items-center justify-between border-b border-gray-200 rounded px-3 py-2 hover:bg-gray-50 cursor-pointer transition"
                      >
                        <div>
                          <p className="text-gray-600 ml-1">Veículos</p>
                          <p className="font-bold ml-1">
                            {func.veiculo || "Nenhum veículo cadastrado"}
                          </p>
                        </div>
                        <ChevronRight className="text-gray-400" />
                      </div>
                    </div>
                  </div>

                
                  <div className="flex gap-3 mt-4 px-4 pb-4">
                    <button
                      onClick={handleEdit}
                      className="flex-1 bg-white text-blue-600 border border-blue-600 rounded px-4 py-2 font-semibold hover:bg-blue-50 transition cursor-pointer"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(func)}
                      className="flex-1 bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                      Apagar
                    </button>
                  </div>
                </div>
              </div>

             
              <div className="flex-1 flex flex-col p-4 space-y-4 h-full overflow-auto ">
                <div className="flex gap-4">
                  <div className="bg-white shadow flex-1 rounded p-5 flex flex-col justify-between border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Contato</h2>
                    <div className="space-y-3 border-1 border-b-0 border-gray-200 rounded">
                      <CardDetails title="Email" info="Não informado" />
                      <CardDetails title="Telefone" info="Não informado" />
                      <CardDetails title="Endereço" info="Não informado" />
                    </div>
                  </div>
                  <div className="bg-white shadow flex-1 rounded p-5 border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Distribuição de presença</h2>
                    <PieGraph data={presencaDistribuicao} />
                  </div>
                </div>
                <div className="bg-white shadow rounded p-5 flex-1 overflow-auto border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Horas semanais</h2>
                  <BarGraph data={presencaData} datakey="horas" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="veiculos"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full p-4 overflow-auto"
            >
              <VehicleDetails veiculos={func.veiculos} onBack={handleBackToDetails} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default EmployeeDetails;
