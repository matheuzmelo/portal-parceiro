"use client";

import { useRef, useState } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadModal({ isOpen, onClose }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Por favor, selecione um arquivo CSV válido.");
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert("Nenhum arquivo selecionado!");
      return;
    }

    // Aqui pode ser feita a lógica para enviar o arquivo para o servidor
    console.log("Enviando arquivo:", file.name);

    // Fechar o modal após o upload
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#11111173] backdrop-blur-md z-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-3xl ">
        <h2 className="text-lg font-semibold mb-4">Enviar Planilha (.csv)</h2>

        <input
          type="file"
          accept=".csv"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="w-full px-4 py-2 border-2 border-to-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        />

        {file && <p className="text-sm text-gray-700">Selecionado: {file.name}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-600 cursor-pointer hover:bg-gray-700 transition-all duration-300 font-light text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            className="bg-yellow-650 cursor-pointer hover:bg-yellow-600 transition-all duration-300 font-light text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
