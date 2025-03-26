import React from "react";

type SecondaryButtonProps = {
    action: () => void;
    text: string;
    icon?: React.ReactNode
  };

  export default function SecondaryButton({ action, text, icon }: SecondaryButtonProps) {
    return (
      <button onClick={action} className="hover:bg-blue-1000 cursor-pointer transition-all duration-300 hover:shadow font-light bg-blue-950 text-white px-4 py-2 rounded-md flex items-center gap-2">
        {icon}
        {text}
      </button>
    );
  }
