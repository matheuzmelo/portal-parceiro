import React from "react";

type PrimaryButtonProps = {
    action: () => void;
    text: string;
    icon?: React.ReactNode;
};

export const PrimaryButton = ({action, text, icon}: PrimaryButtonProps) => {
    return (
        <button
            onClick={action}
            className="bg-yellow-650 font-light hover:bg-yellow-600 cursor-pointer px-4 py-2 rounded-md hover:shadow transition-all duration-300 flex items-center gap-2 text-blue-1000"
        >
            {icon}
            {text}
        </button>
    )
}
