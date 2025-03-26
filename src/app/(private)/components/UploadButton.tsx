import { UploadSimple } from "@phosphor-icons/react";
import { PrimaryButton } from "./PrimaryButton";

interface UploadButtonProps {
  action: () => void;
}

export default function UploadButton({ action }: UploadButtonProps) {
  return (

    <PrimaryButton icon={<UploadSimple />} action={action} text="carga de dados" />
  );
}
