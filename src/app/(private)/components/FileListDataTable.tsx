"use client";

import { Export, File, Sliders } from "@phosphor-icons/react";
import clsx from "clsx";
import { saveAs } from "file-saver";
import React, { useEffect, useState, useRef } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { AsideComponent } from "./AsideComponent";
import { AsideComponentAttachFiles } from "./AsideComponetAttachFiles";
import SecondaryButton from "./SecondaryButton";

interface TableData {
    id: number;
    name: string;
    releaseDate: string;
    countFileLines: number;
    banks: string;
    status: string;
    leads: { id: number; name: string; email: string; cpf: string; phone: string; address: string; status: string }[];
}

const DataTableComponent: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [filterText, setFilterText] = useState("");
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAttachFilesSidebarOpen, setIsAttachFilesSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const generateFiles = () => {
      const files = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `${index * 9 + 97} - exemplo de arquivo`,
        releaseDate: `2013/05/${(index % 30) + 1}`,
        countFileLines: Math.floor(Math.random() * 100000) + 1,
        banks: ['Itaú', 'Bradesco', 'Santander', 'Caixa'][index % 4],
        status: ['Válido', 'Inválido', 'Processado', 'Em Validação', 'Em Processamento'][index % 5],
        leads: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, leadIndex) => ({
          id: leadIndex + 1,
          name: `Lead ${leadIndex + 1}`,
          email: `lead${leadIndex + 1}@example.com`,
          phone: `+55 11 9${Math.floor(100000000 + Math.random() * 900000000)}`,
          cpf: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
          address: `Address ${leadIndex + 1}`,
          status: ['Active', 'Inactive'][leadIndex % 2],
        })),
      }));

      const storedData = localStorage.getItem("data");
      if (!storedData) {
        localStorage.setItem("data", JSON.stringify(files));
        return files;
      }
      return JSON.parse(storedData);
    };

    const files = generateFiles();
    setData(files);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleRowClick = (row: TableData) => {
    setSelectedRow(row);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedRow(null), 300); // Aguarda a animação antes de limpar os dados
  };

  const exportCSV = () => {
    const csvContent =
      ["nome_do_arquivo;data_criacao;total_linhas;bancos;status"]
        .concat(data.map((d) => `${d.name};${d.releaseDate};${d.countFileLines};${d.banks};${d.status}`))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "datatable_export.csv");
  };

  const handleAction = (action: string, row: TableData) => {
    switch (action) {
      case "attach_evidence":
        setSelectedRow(row);
        setIsAttachFilesSidebarOpen(true);
        break;
      case "delete":
        console.log("Delete action for:", row);
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const closeAttachFilesSidebar = () => {
    setIsAttachFilesSidebarOpen(false);
    setTimeout(() => setSelectedRow(null), 300); // Wait for animation before clearing data
  };

  const columns: TableColumn<TableData>[] = [
    {
      name: "Ações",
      cell: (row) => {
        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

        return (
          <div className="absolute w-3xs" ref={dropdownRef}>
            <button
              className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Sliders size={20} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-md rounded-lg p-2 z-10">
                <button
                  onClick={() => {
                    handleAction("attach_evidence", row);
                    setIsDropdownOpen(false);
                  }}
                  className="flex gap-2 items-center px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                  <File size={20}/> Anexar evidencia
                </button>
              </div>
            )}
          </div>
        );
      },
      width: "120px",
    },
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      width: '100px'
    },
    {
      name: "Nome do Arquivo",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Data de Criação",
      selector: (row) => row.releaseDate,
      sortable: true,
    },
    {
      name: "Total de linhas",
      selector: (row) => row.countFileLines.toLocaleString(),
      sortable: true,
    },
    {
      name: "Bancos",
      selector: (row) => row.banks,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (<span
          className={clsx(
            "px-2 py-1 rounded",
            {
              "bg-green-200 text-green-800": row.status === "Válido",
              "bg-red-200 text-red-800": row.status === "Inválido",
              "bg-blue-200 text-blue-800": row.status === "Processado",
              "bg-yellow-200 text-yellow-800": row.status === "Em Validação",
              "bg-purple-200 text-purple-800": row.status === "Em Processamento",
            }
          )}
        >
          {row.status}
        </span>),
      sortable: true,
    },
  ];

  return (
    <section className="p-6 bg-white shadow-md rounded-lg h-full relative">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome..."
          className="border p-2 rounded-lg w-1/3"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />

        <SecondaryButton icon={<Export />} action={exportCSV} text="Exporta CSV" />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        pointerOnHover
        onRowClicked={handleRowClick}
      />

      <AsideComponent
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        selectedRow={selectedRow}
      />

      <AsideComponentAttachFiles
        isSidebarOpen={isAttachFilesSidebarOpen}
        closeSidebar={closeAttachFilesSidebar}
        selectedRow={selectedRow}
      />
    </section>
  );
};

export default DataTableComponent;
