import React from "react";
import { X } from "@phosphor-icons/react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

interface ClientAsideComponentProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  selectedClient: Client | null;
}

export const ClientAsideComponent: React.FC<ClientAsideComponentProps> = ({
  isSidebarOpen,
  closeSidebar,
  selectedClient,
}) => {
  return (
    <aside
      className={`fixed top-0 right-0 w-1/2 h-full bg-gray-100 shadow-xl p-6 z-50 transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute top-4 right-4 text-gray-600"
        onClick={closeSidebar}
      >
        <X size={24} className="cursor-pointer" />
      </button>
      {selectedClient && (
        <div>
          <h2 className="text-xl font-bold mb-4">Detalhes do Cliente</h2>
          <p><strong>ID:</strong> {selectedClient.id}</p>
          <p><strong>Nome:</strong> {selectedClient.name}</p>
          <p><strong>Email:</strong> {selectedClient.email}</p>
          <p><strong>Telefone:</strong> {selectedClient.phone}</p>
          <p><strong>Endereço:</strong> {selectedClient.address}</p>
          <p><strong>Status:</strong> {selectedClient.status}</p>
        </div>
      )}
    </aside>
  );
};
