interface StatusBadgeProps {
    status: string;
  }

  export default function StatusBadge({ status }: StatusBadgeProps) {
    const statusClasses: Record<string, string> = {
      "VALIDADO": "bg-green-500 text-white",
      "PROCESSADO": "bg-yellow-500 text-white",
      "Pendente em: Qualidade": "bg-orange-500 text-white",
    };

    return <span className={`px-2 py-1 rounded text-xs ${statusClasses[status] || "bg-gray-500 text-white"}`}>{status}</span>;
  }
