import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Páginas
import Login from "./pages/Login.jsx";
import App from "./App.jsx"; // Dashboard principal
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./pages/AddEmployee.jsx";
import EditEmployee from "./pages/EditEmployee.jsx";
import EntryControl from "./pages/EntryControl.jsx";
import Visitors from "./pages/Visitors.jsx";
import AddVisitor from "./pages/AddVisitor.jsx";

// Componente de rotas protegidas
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  // Rota pública
  { path: "/", element: <Login /> },

  // Rotas protegidas
  {
    path: "/paginainicial",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/funcionarios",
    element: (
      <PrivateRoute>
        <Employees />
      </PrivateRoute>
    ),
  },
  {
    path: "/adicionarfuncionario",
    element: (
      <PrivateRoute>
        <AddEmployee />
      </PrivateRoute>
    ),
  },
  {
    path: "/editar/:cpf",
    element: (
      <PrivateRoute>
        <EditEmployee />
      </PrivateRoute>
    ),
  },
  {
    path: "/controle",
    element: (
      <PrivateRoute>
        <EntryControl />
      </PrivateRoute>
    ),
  },
  {
    path: "/visitantes",
    element: (
      <PrivateRoute>
        <Visitors />
      </PrivateRoute>
    ),
  },
  {
    path: "/adicionarvisitante",
    element: (
      <PrivateRoute>
        <AddVisitor />
      </PrivateRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);