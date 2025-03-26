import { Scroll } from "@phosphor-icons/react";
import SecondaryButton from "./SecondaryButton";

type EvidenceReportButtonProps = {
  action: () => void;
};

export default function EvidenceReportButton({ action }: EvidenceReportButtonProps) {
  return (
    <SecondaryButton icon={<Scroll />} action={() => action} text="Relatório de Evidências" />
  );
}
