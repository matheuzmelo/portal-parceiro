"use client";

import { useState } from "react";
import DataTableComponent from "../components/DataTable";
import EvidenceReportButton from "../components/EvidenceReportButton";
import UploadButton from "../components/UploadButton";
import UploadModal from "../components/UploadModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md h-full">
        <div>
            <h1 className="text-lg font-medium text-blue-1000">Listagem de Cargas</h1>
        </div>
        <div className="flex gap-2">
            <UploadButton action={() => setIsModalOpen(true)} />
            <EvidenceReportButton action={() => console.log('Relatório de evidencias')} />
        </div>
      </section>

      <DataTableComponent />

      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
