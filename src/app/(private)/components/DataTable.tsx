"use client";

import { Export } from "@phosphor-icons/react";
import clsx from "clsx";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import SecondaryButton from "./SecondaryButton";

// Definição do tipo de dado
interface TableData {
    id: number;
    name: string;
    releaseDate: string;
    countFileLines: number;
    banks: string;
    status: string;
}

// Dados da tabela
const data: TableData[] = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `${index * 9 + 97} - exemplo de arquivo`,
    releaseDate: `2013/05/${(index % 30) + 1}`,
    countFileLines: Math.floor(Math.random() * 100000) + 1,
    banks: ['Itaú', 'Bradesco', 'Santander', 'Caixa'][index % 4],
        status: ['Válido', 'Inválido', 'Processado', 'Em Validação', 'Em Processamento'][index % 5],
}));

// Definição das colunas
const columns: TableColumn<TableData>[] = [
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
    right: true,
  },
  {
    name: "Bancos",
    selector: (row) => row.banks,
    sortable: true,
    right: true,
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
    right: true,
  },
];

// Função para exportar CSV
const exportCSV = () => {
  const csvContent =
    ["Name,Release Date,NPM Downloads,Growth"]
      .concat(data.map((d) => `${d.name},${d.releaseDate},${d.banks},${d.countFileLines}`))
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "datatable_export.csv");
};

const DataTableComponent: React.FC = () => {
  const [filterText, setFilterText] = useState("");

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <section className="p-6 bg-white shadow-md rounded-lg h-full">
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
      />
    </section>
  );
};

export default DataTableComponent;
