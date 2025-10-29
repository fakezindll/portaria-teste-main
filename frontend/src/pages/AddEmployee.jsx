import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PhotoInput from "../components/PhotoInput";
import { IMaskInput } from "react-imask";
import { criarFuncionario } from "../services/funcionarios";

function AddEmployee() {
  const [isOpen, setIsOpen] = useState(true);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  const handleAdd = async () => {
    if (!name || !cpf) return alert("Nome e CPF são obrigatórios.");

    const veiculosArray = vehicle
      ? vehicle.split(",").map((v) => ({ placa: v.trim(), modelo: "", marca: "", cor: "" }))
      : [];

    try {
      await criarFuncionario({
        nome: name,
        documento: cpf,
        fotoUrl: photoPreview,
        veiculos: veiculosArray,
        isAtivo: true,
      });
      alert("Funcionário adicionado com sucesso!");
      navigate("/funcionarios");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar funcionário.");
    }
  };

  const handlePhotoChange = (file) => {
    setPhotoFile(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-4">Adicionar Funcionário</h2>
          <PhotoInput onChange={handlePhotoChange} preview={photoPreview} />
          <InputField label="Nome" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o nome" />
          <p className="text-gray-600 my-1">Documento</p>
          <IMaskInput
            mask="000.000.000-00"
            value={cpf}
            onAccept={(value) => setCpf(value)}
            placeholder="Digite o CPF"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Veículos (separar por vírgula)"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value)}
            placeholder="Digite as placas dos veículos"
          />
          <div className="flex justify-between mt-6">
            <button onClick={handleBack} className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
              Voltar
            </button>
            <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
