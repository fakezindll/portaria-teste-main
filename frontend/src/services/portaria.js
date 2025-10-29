import axios from "axios";

const API_URL = "http://localhost:8080/api/portaria";

const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// 🔹 Registrar entrada
export const registrarEntrada = async (documento) => {
  const response = await axios.post(
    `${API_URL}/entrada`,
    { identificador: documento },
    config()
  );
  return response.data;
};

// 🔹 Registrar saída
export const registrarSaida = async (documento) => {
  const response = await axios.put(
    `${API_URL}/saida`,
    { identificador: documento },
    config()
  );
  return response.data;
};

// 🔹 Listar funcionários com entrada ativa
export const listarEntradasAtivas = async () => {
  const response = await axios.get(`${API_URL}/ativos`, config());
  return response.data; // retorna lista de IDs de funcionários com entrada ativa
};
