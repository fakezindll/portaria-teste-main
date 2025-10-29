import axios from "axios";

const API_URL = "http://localhost:8080/api/funcionarios";
const getToken = () => localStorage.getItem("token");

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const listarFuncionarios = async () => {
  const response = await axios.get(API_URL, config());
  return response.data;
};

export const criarFuncionario = async (funcionario) => {
  const response = await axios.post(API_URL, funcionario, config());
  return response.data;
};

export const atualizarFuncionario = async (id, funcionario) => {
  const response = await axios.put(`${API_URL}/${id}`, funcionario, config());
  return response.data;
};

export const deletarFuncionario = async (id) => {
  await axios.delete(`${API_URL}/${id}`, config());
};
