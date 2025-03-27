import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import clsx from "clsx";

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
  const [audioFile, setAudioFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "audio/mpeg") {
      const fileURL = URL.createObjectURL(file);
      setAudioFile(fileURL);
    } else {
      alert("Por favor, envie um arquivo .mp3 válido.");
    }
  };

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
            <h2 className="text-xl font-medium mb-4">Detalhes do Arquivo</h2>
            <div className="grid md:grid-cols-2">
              <div className="grid gap-6">
                {selectedClient.id && (
                  <p>
                    <span className="font-medium">ID:</span>{" "}
                    <span className="p-2 bg-gray-300 rounded-lg">{selectedClient.id}</span>
                  </p>
                )}
                {selectedClient.name && (
                  <p>
                    <span className="font-medium">Nome:</span>{" "}
                    <span className="p-2 bg-gray-300 rounded-lg">{selectedClient.name}</span>
                  </p>
                )}
                {selectedClient.email && (
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    <span className="p-2 bg-gray-300 rounded-lg">{selectedClient.email}</span>
                  </p>
                )}
              </div>
              <div className="grid gap-6">
                {selectedClient.address && (
                  <p>
                    <span className="font-medium">Endereço:</span>{" "}
                    <span className="p-2 bg-gray-300 rounded-lg">{selectedClient.address}</span>
                  </p>
                )}
                {selectedClient.phone && (
                  <p>
                    <span className="font-medium">Telefone:</span>{" "}
                    <span className="p-2 bg-gray-300 rounded-lg">{selectedClient.phone}</span>
                  </p>
                )}
                {selectedClient.status && (
                  <p>
                    <span
                      className={clsx(
                        "font-medium",
                        {
                          "bg-green-200 text-green-800": selectedClient.status === "Válido",
                          "bg-red-200 text-red-800": selectedClient.status === "Inválido",
                          "bg-blue-200 text-blue-800": selectedClient.status === "Processado",
                          "bg-yellow-200 text-yellow-800": selectedClient.status === "Em Validação",
                          "bg-purple-200 text-purple-800": selectedClient.status === "Em Processamento",
                        }
                      )}
                    >
                      Status:
                    </span>{" "}
                    <span className="p-2 bg-gray-300 rounded-lg">{selectedClient.status}</span>
                  </p>
                )}
              </div>
            </div>
            </div>
      )}
      <div className="mt-10 pt-4">
        <h3 className="text-lg font-medium mb-2">Evidências</h3>
        <input
          type="file"
          accept=".mp3"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-600 file:bg-blue-950 hover:file:bg-blue-1000 file:px-4 file:py-2 file:mr-4 file:cursor-pointer file:rounded-xl file:text-white"
        />
        {audioFile && (
          <audio controls className="mt-4 w-full">
            <source src={audioFile} type="audio/mpeg" />
            Seu navegador não suporta o elemento de áudio.
          </audio>
        )}
      </div>
    </aside>
  );
};
