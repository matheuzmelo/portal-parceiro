import React, { useState } from "react";
import { ArrowArcRight, ArrowRight, X } from "@phosphor-icons/react";
import DataTable from "react-data-table-component";
import { ClientAsideComponent } from "./ClientAsideComponent";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
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

export const AsideComponent: React.FC<AsideComponentProps> = ({
  isSidebarOpen,
  closeSidebar,
  selectedRow,
}) => {
  const [isClientSidebarOpen, setIsClientSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Lead | null>(null);

  const handleRowClick = (client: Lead) => {
    setSelectedClient(client);
    setIsClientSidebarOpen(true);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Lead) => row.id,
      sortable: true,
    },
    {
      name: "Nome",
      selector: (row: Lead) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: Lead) => row.email,
      sortable: true,
    },
  ];

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
        {selectedRow && (
          <div>
            <h2 className="text-xl font-bold mb-4">Detalhes do Arquivo</h2>
            <p><strong>ID:</strong> {selectedRow.id}</p>
            <p><strong>Nome:</strong> {selectedRow.name}</p>
            <p><strong>Data de Criação:</strong> {selectedRow.releaseDate}</p>
            <p><strong>Total de Linhas:</strong> {selectedRow.countFileLines.toLocaleString()}</p>
            <p><strong>Bancos:</strong> {selectedRow.banks}</p>
            <p><strong>Status:</strong> {selectedRow.status}</p>

            {selectedRow.leads && selectedRow.leads.length > 0 ? (
              <>
                <h3 className="text-lg font-medium mt-6 mb-2">Clientes</h3>
                <DataTable
                  columns={columns}
                  data={selectedRow.leads}
                  pagination
                  onRowClicked={handleRowClick}
                  highlightOnHover
                  pointerOnHover
                  expandOnRowClicked
                />
              </>
            ) : (
              <p className="mt-4 text-gray-600">Nenhum lead disponível.</p>
            )}
          </div>
        )}
      </aside>

      <ClientAsideComponent
        isSidebarOpen={isClientSidebarOpen}
        closeSidebar={() => setIsClientSidebarOpen(false)}
        selectedClient={selectedClient}
      />
    </>
  );
};
