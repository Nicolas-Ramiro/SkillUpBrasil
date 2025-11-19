import { useState } from "react";
import FormProgresso from "./components/FormProgresso";
import ListaProgresso from "./components/ListaProgresso";
import BotaoDashboard from "../../../components/BotaoDashboard";

type Progresso = {
  idProgresso?: number;
  idUsuario: number | string;
  idCurso: number | string;
  percentual: number | string;
  dataAtualizacao?: string;
};

export default function ProgressoPage() {
  const [modo, setModo] = useState<"lista" | "form">("lista");
  const [progressoEdit, setProgressoEdit] = useState<Progresso | null>(null);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-verde">Progresso</h1>

      {modo === "lista" ? (
        <ListaProgresso
          onNovo={() => setModo("form")}
          onEditar={(progresso) => {
            setProgressoEdit(progresso);
            setModo("form");
          }}
        />
      ) : (
        <FormProgresso
          progresso={progressoEdit}
          onCancel={() => {
            setProgressoEdit(null);
            setModo("lista");
          }}
          onSuccess={() => {
            setProgressoEdit(null);
            setModo("lista");
          }}
        />
      )}

      <div className="flex justify-between items-center mb-6 mt-6">
        <BotaoDashboard />
      </div>
    </div>
  );
}
