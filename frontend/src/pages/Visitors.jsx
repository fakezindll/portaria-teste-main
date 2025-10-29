import Sidebar from "../components/Sidebar";
import { useState } from "react";

function Visitors() {
  const [isOpen, setIsOpen] = useState(true);


  const visitantes = [
    { name: "Ana", time: "2025-10-20 09:00", purpose: "Reunião" },
    { name: "Bruno", time: "2025-10-20 10:30", purpose: "Entrega" },
    { name: "Clara", time: "2025-10-20 11:15", purpose: "Visita" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 p-6 transition-all duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Visitantes</h1>
        <p className="text-gray-600 mb-6">Lista de visitantes do dia</p>

        <div className="bg-white shadow rounded-lg p-4">
          {visitantes.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-4">Nome</th>
                  <th className="py-2 px-4">Horário</th>
                  <th className="py-2 px-4">Motivo</th>
                </tr>
              </thead>
              <tbody>
                {visitantes.map((v, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-2 px-4">{v.name}</td>
                    <td className="py-2 px-4">{v.time}</td>
                    <td className="py-2 px-4">{v.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">Nenhum visitante registrado.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Visitors;
