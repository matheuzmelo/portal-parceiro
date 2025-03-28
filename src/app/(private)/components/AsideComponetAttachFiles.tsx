import { Upload, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import SecondaryButton from "./SecondaryButton";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  status: string;
}

interface AsideComponentProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  selectedRow: {
    id: number;
    name: string;
    releaseDate: string;
    countFileLines: number;
    banks: string;
    status: string;
    leads?: Lead[];
  } | null;
}

export const AsideComponentAttachFiles: React.FC<AsideComponentProps> = ({
  isSidebarOpen,
  closeSidebar,
  selectedRow,
}) => {
  const [selectedClient, setSelectedClient] = useState<Lead | null>(null);
  const [clientFiles, setClientFiles] = useState<Record<string, string[]>>({});

  const handleRowClick = (client: Lead) => {
    setSelectedClient(client);
  };

  const handleFileUpload = (files: FileList) => {
    const newClientFiles: Record<string, string[]> = { ...clientFiles };

    Array.from(files).forEach((file) => {
      const cpfMatch = file.name.match(/\d{11}/); // Extrai o CPF do nome do arquivo
      if (cpfMatch) {
        const cpf = cpfMatch[0];
        if (!newClientFiles[cpf]) {
          newClientFiles[cpf] = [];
        }
        newClientFiles[cpf].push(file.name);
      }
    });

    setClientFiles(newClientFiles);
  };

  const bindFileToClient = (file: File, client: Lead) => {
    const newClientFiles: Record<string, string[]> = { ...clientFiles };
    const cpf = client.cpf;

    if (!newClientFiles[cpf]) {
      newClientFiles[cpf] = [];
    }
    newClientFiles[cpf].push(file.name);

    setClientFiles(newClientFiles);
  };

  useEffect(() => {
    console.log("Arquivos associados aos clientes:", clientFiles);
  }, [clientFiles]);

  return (
    <>
      <aside
        className={`fixed top-0 right-0 w-1/2 h-full bg-gray-100 shadow-lg p-6 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={closeSidebar}
        >
          <X size={24} className="cursor-pointer" />
        </button>
            <div className="mt-6 w-full">
              <h3 className="text-lg font-medium mb-2">Upload de Arquivos de Evidência</h3>
              <div className="flex rounded-md w-full justify-between bg-gray-200 p-2">
                <div className="w-full">
                    <input
                        type="file"
                        multiple
                        accept=".mp3"
                        onChange={(e) => {
                        if (e.target.files && selectedClient) {
                            Array.from(e.target.files).forEach((file) => bindFileToClient(file, selectedClient));
                        }
                        }}
                        className="file:text-white file:cursor-pointer rounded-md w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-blue-950 hover:file:bg-blue-1000"
                    />
                </div>

                <div className="w-1/3 flex justify-end items-center">
                    <SecondaryButton action={() => handleFileUpload} text="Enviar evidências" icon={<Upload />} />
                </div>
            </div>
            </div>
      </aside>
    </>
  );
};
