import axios from "axios";

// Instância base do Axios
const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Função de login
export const login = async (username, password) => {
  const response = await API.post("/auth/login", { username, password });
  return response.data; // retorna { token: "..." }
};

// Função para criar instância Axios com JWT
export const getAuthAPI = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Exemplo de endpoint protegido usando getAuthAPI
export const getVisitantes = () => getAuthAPI().get("/visitantes");
export const criarVisitante = (visitante) => getAuthAPI().post("/visitantes", visitante);
export const atualizarVisitante = (id, visitante) => getAuthAPI().put(`/visitantes/${id}`, visitante);
export const deletarVisitante = (id) => getAuthAPI().delete(`/visitantes/${id}`);