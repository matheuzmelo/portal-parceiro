type InputTextProps = {
    name: string,
    id: string | undefined,
    isRequired: boolean
}

export const InputText = ({name, id, isRequired}: InputTextProps) => {
    return(
        <input
            className="w-full px-4 py-2 border-2 border-to-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            type="text"
            id={id}
            required={isRequired ? true : false}
        />
    )
}
